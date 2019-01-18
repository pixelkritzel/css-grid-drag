import { applySnapshot, Instance, onSnapshot, setLivelynessChecking, types } from 'mobx-state-tree';

import { getDefaultData, dataStoreModel, IDataSnaphotIn } from './dataStore';
import { elementModel, IElement } from './elementModel';
import { gridModel, cellType, ICellId } from './gridModel';
import { placementModel } from './placementModel';
import { IResource, resourceModel } from './resourceModel';

const localStorageKey = 'css-grid-drag-store';

setLivelynessChecking('error');

function createStoreSnapShot(isUseLocalData = false, dataSnapshot?: IDataSnaphotIn) {
  let initialData: IDataSnaphotIn;

  const localData = localStorage.getItem(localStorageKey);

  if (localData && !isUseLocalData) {
    initialData = JSON.parse(localData);
  } else if (dataSnapshot) {
    initialData = dataSnapshot;
  } else {
    initialData = getDefaultData();
  }

  return {
    currentAction: undefined,
    data: initialData,
    draggedOverCell: undefined,
    draggedResource: undefined,
    droppedOverCell: undefined,
    isExport: false,
    placement: undefined,
    selectedElement: undefined,
    shownGrid: initialData!.grids![0]!.id as string
  };
}

export const storeModel = types
  .model('store', {
    currentAction: types.maybe(
      types.enumeration(['ELEMENT_MOVE', 'START_PLACEMENT', 'MOVE_PLACEMENT', 'RESOURCE_DRAG'])
    ),
    data: dataStoreModel,
    draggedOverCell: types.maybe(cellType),
    draggedResource: types.maybe(types.reference(resourceModel)),
    droppedOverCell: types.maybe(cellType),
    isExport: false,
    placement: types.maybe(placementModel),
    selectedElement: types.maybe(types.reference(elementModel)),
    shownGrid: types.reference(gridModel)
  })
  .views(self => ({
    get isCellHighlight() {
      return self.currentAction && self.currentAction !== 'ELEMENT_MOVE';
    },
    get isGuidesFront() {
      return !!self.currentAction;
    }
  }))
  .actions(self => {
    return {
      afterCreate() {
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line no-console
          onSnapshot(self.data, console.log);
        }

        onSnapshot(self.data, snapShot =>
          localStorage.setItem(localStorageKey, JSON.stringify(snapShot, undefined, 2))
        );
      },
      addElementToGrid() {
        const { placement, shownGrid } = self;
        if (!placement) {
          return;
        }
        const { width, height, resource } = placement;
        const start = placement.start();
        const { columnName, rowName } = start;
        const data = {
          start: {
            columnName,
            rowName
          },
          width,
          height,
          resource: resource.id
        };
        const element = elementModel.create(data);
        shownGrid.addElement(element);
      },
      dragOverCell(cellId: ICellId | undefined) {
        if (cellId) {
          self.draggedOverCell = cellId;
        }
      },
      dropOverCell(cellId: ICellId) {
        self.droppedOverCell = cellId;
        if (self.currentAction === 'START_PLACEMENT') {
          this.startElementPlacement();
        }
      },
      load(dataSnapshot: IDataSnaphotIn) {
        applySnapshot(self, createStoreSnapShot(true, dataSnapshot));
      },
      mouseOverCell(cellId: ICellId) {
        if (self.currentAction === 'MOVE_PLACEMENT' && self.placement) {
          self.placement.movePlacementEnd(cellId);
        }
      },
      mouseUpCell(cell: ICellId) {
        if (self.currentAction === 'MOVE_PLACEMENT' && self.placement) {
          this.addElementToGrid();
          self.placement = undefined;
          self.currentAction = undefined;
        }
      },
      resetStore() {
        applySnapshot(self, createStoreSnapShot(true));
      },
      setCurrentAction(actionName: typeof self.currentAction) {
        self.currentAction = actionName;
      },
      setDraggedResource(resource: IResource) {
        self.draggedResource = resource;
        self.currentAction = 'START_PLACEMENT';
      },
      setSelectedElement(element: IElement) {
        self.selectedElement = element;
      },
      startElementPlacement() {
        const { draggedResource: resource, droppedOverCell } = self;
        if (droppedOverCell && resource) {
          self.placement = placementModel.create({
            _start: droppedOverCell,
            width: 1,
            height: 1,
            resource: resource.id
          });
          self.draggedResource = undefined;
          self.currentAction = 'MOVE_PLACEMENT';
        }
      },
      toggleIsExport() {
        self.isExport = !self.isExport;
      },
      unsetSelectedElement() {
        self.selectedElement = undefined;
      }
    };
  })
  .preProcessSnapshot(snapshot => {
    // it seems preProcessSnapshot gets passed an empty object as default value hence this check
    return Object.keys(snapshot).length > 0 ? snapshot : createStoreSnapShot();
  });

export type IStore = Instance<typeof storeModel>;
// export type IStoreData = SnapshotIn<typeof storeModel>;
