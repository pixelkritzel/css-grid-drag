import { types } from 'mobx-state-tree';

import { ICellModel } from './cellModel';
import { elementModel } from './elementModel';
import { gridModel } from './gridModel';
import { resourceModel } from './resourceModel';

export const placementModel = types
  .model('placementModel', {
    _start: types.model({
      columnIndex: types.number,
      rowIndex: types.number
    }),
    end: types.model({
      columnIndex: types.number,
      rowIndex: types.number
    }),
    resource: types.reference(resourceModel),
    grid: types.reference(gridModel)
  })
  .views(self => ({
    get start() {
      const start = { ...self._start };
      if (self.end.columnIndex < self._start.columnIndex) {
        start.columnIndex++;
      }
      if (self.end.rowIndex < self._start.rowIndex) {
        start.rowIndex++;
      }
      return start;
    }
  }))
  .actions(self => ({
    addElementToGrid() {
      const { start: dragStart, end: dragEnd, grid, resource } = self;
      const data = {
        start: {
          column: grid.columns[dragStart.columnIndex],
          row: grid.rows[dragStart.rowIndex]
        },
        end: {
          column: grid.columns[dragEnd.columnIndex],
          row: grid.rows[dragEnd.rowIndex]
        },
        resource
      };
      const element = elementModel.create(data);
      grid.addElement(element);
    },
    movePlacementEnd(cell: ICellModel) {
      const { start, end } = self;
      if (cell.columnIndex < start.columnIndex) {
        end.columnIndex = cell.columnIndex;
      } else {
        end.columnIndex = cell.columnIndex + 1;
      }
      if (cell.rowIndex < start.rowIndex) {
        end.rowIndex = cell.rowIndex;
      } else {
        end.rowIndex = cell.rowIndex + 1;
      }
    }
  }));
