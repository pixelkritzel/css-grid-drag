import { types } from 'mobx-state-tree';

import { IResource, resourceModel } from './resourceModel';
import { gridModel, IGridModel } from './gridModel';
import { elementModel } from './elementModel';

const placementModel = types
  .model('placementModel', {
    _start: types.model({
      column: types.number,
      row: types.number
    }),
    end: types.model({
      column: types.number,
      row: types.number
    }),
    resource: types.reference(resourceModel),
    grid: types.reference(gridModel)
  })
  .views(self => ({
    get start() {
      const start = { ...self._start };
      if (self.end.column < self._start.column) {
        start.column++;
      }
      if (self.end.row < self._start.row) {
        start.row++;
      }
      return start;
    }
  }));

const uiModel = types
  .model('ui', {
    draggedResource: types.maybe(types.reference(resourceModel)),
    placement: types.maybe(placementModel)
  })
  .actions(self => ({
    dropDraggedResource() {
      self.draggedResource = undefined;
    },
    setDraggedResource(resource: IResource) {
      self.draggedResource = resource;
    },
    addElementToGrid() {
      if (self.placement) {
        const { start: dragStart, end: dragEnd, resource } = self.placement;
        const data = {
          start: {
            column: self.placement.grid.columns[dragStart.column],
            row: self.placement.grid.rows[dragStart.row]
          },
          end: { column: self.placement.grid.columns[dragEnd.column], row: self.placement.grid.rows[dragEnd.row] },
          resource
        };
        self.placement.grid.elements.push(elementModel.create(data));
      }
      this.resetDrag();
    },
    resetDrag() {
      self.placement = undefined;
    },
    moveDrag(column: number, row: number) {
      const drag = self.placement!;
      const { start, end } = drag;
      if (column < start.column) {
        end.column = column;
      } else {
        end.column = column + 1;
      }
      if (row < start.row) {
        end.row = row;
      } else {
        end.row = row + 1;
      }
    },
    startElementPlacement(column: number, row: number, resource: IResource, grid: IGridModel) {
      self.placement = placementModel.create({
        _start: { column, row },
        end: { column: column + 1, row: row + 1 },
        resource,
        grid
      });
    }
  }));

export const uiStore = uiModel.create();

export type IUiStore = typeof uiModel.Type;
