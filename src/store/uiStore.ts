import { types } from 'mobx-state-tree';

import { ICellModel, cellModel } from './cellModel';
import { elementModel, IElement } from './elementModel';
import { gridModel } from './gridModel';
import { placementModel } from './placementModel';
import { IResource, resourceModel } from './resourceModel';

export const uiModel = types
  .model('ui', {
    draggedResource: types.maybe(types.reference(resourceModel)),
    placement: types.maybe(placementModel),
    selectedElement: types.maybe(types.reference(elementModel)),
    draggedOverCell: types.maybe(types.reference(cellModel)),
    droppedOverCell: types.maybe(types.reference(cellModel)),
    currentAction: types.maybe(types.enumeration(['START_PLACEMENT', 'MOVE_PLACEMENT'])),
    shownGrid: types.reference(gridModel)
  })
  .actions(self => ({
    setDraggedResource(resource: IResource) {
      self.draggedResource = resource;
      self.currentAction = 'START_PLACEMENT';
    },
    dragOverCell(cellInstance: ICellModel | undefined) {
      self.draggedOverCell = cellInstance;
    },
    dropOverCell(cellInstance: ICellModel) {
      self.droppedOverCell = cellInstance;
      if (self.currentAction === 'START_PLACEMENT') {
        this.startElementPlacement();
      }
    },
    mouseOverCell(cellInstance: ICellModel) {
      if (self.currentAction === 'MOVE_PLACEMENT' && self.placement) {
        self.placement.movePlacementEnd(cellInstance);
      }
    },
    mouseUpCell(cellInstance: ICellModel) {
      if (self.currentAction === 'MOVE_PLACEMENT' && self.placement) {
        self.placement.addElementToGrid();
        self.placement = undefined;
      }
    },
    startElementPlacement() {
      const { draggedResource: resource, droppedOverCell, shownGrid: grid } = self;
      if (droppedOverCell && resource) {
        const { columnIndex, rowIndex } = droppedOverCell;
        self.placement = placementModel.create({
          _start: { columnIndex, rowIndex },
          end: { columnIndex: columnIndex + 1, rowIndex: rowIndex + 1 },
          resource,
          grid
        });
        self.draggedResource = undefined;
        self.currentAction = 'MOVE_PLACEMENT';
      }
    },
    setSelectedElement(element: IElement) {
      self.selectedElement = element;
    },
    unsetSelectedElement() {
      self.selectedElement = undefined;
    }
  }));

export type IUiStore = typeof uiModel.Type;
