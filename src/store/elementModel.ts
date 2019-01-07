import { getParent, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { ICellModel } from './cellModel';
import { IGridModel } from './gridModel';
import { resourceModel } from './resourceModel';

export const elementModel = types
  .model('element', {
    id: types.optional(types.identifier, uuid),
    start: types.model({
      columnName: types.string,
      rowName: types.string
    }),
    width: types.number,
    height: types.number,
    resource: types.reference(resourceModel)
  })
  .views(self => ({
    get grid() {
      const grid = getParent(self, 2) as IGridModel;
      return grid;
    },
    get ratio() {
      return (self.height * this.grid.cellHeight) / (self.width * this.grid.cellWidth);
    },
    get startCell() {
      const startCell = this.grid.cells.find(
        cell => cell.columnName === self.start.columnName && cell.rowName === self.start.rowName
      );
      return startCell!;
    }
  }))
  .actions(self => ({
    changeHeight(cell: ICellModel) {
      const height = cell.rowIndex - self.startCell.rowIndex + 1;
      if (height > 0) {
        self.height = height;
      }
    },
    moveLeft(cell: ICellModel) {
      const { columnName, columnIndex } = cell;
      const newWidth = self.width + self.startCell.columnIndex - columnIndex;
      if (newWidth > 0) {
        self.width = newWidth;
        self.start.columnName = columnName;
      }
    },
    changeWidth(cell: ICellModel) {
      const width = cell.columnIndex - self.startCell.columnIndex + 1;
      if (width > 0) {
        self.width = width;
      }
    },
    moveTop(cell: ICellModel) {
      const { rowName, rowIndex } = cell;
      const newHeight = self.height + self.startCell.rowIndex - rowIndex;
      if (newHeight > 0) {
        self.height = newHeight;
        self.start.rowName = rowName;
      }
    }
  }));

export type IElement = typeof elementModel.Type;
