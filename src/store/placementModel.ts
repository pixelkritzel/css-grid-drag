import { types } from 'mobx-state-tree';

import { ICellModel } from './cellModel';
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
    resource: types.reference(resourceModel)
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
