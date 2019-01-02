import { types } from 'mobx-state-tree';
import { resourceModel } from './resourceModel';
import * as uuid from 'uuid/v4';

import { ICellModel } from './cellModel';

const coordinatesModel = types.model('coordinates', {
  column: types.string,
  row: types.string
});

export const elementModel = types
  .model('element', {
    id: types.optional(types.identifier, uuid),
    start: coordinatesModel,
    end: coordinatesModel,
    resource: types.reference(resourceModel)
  })
  .actions(self => ({
    moveBottom(cell: ICellModel) {
      self.end.row = cell.rowName;
    },
    moveLeft(cell: ICellModel) {
      self.start.column = cell.columnName;
    },
    moveRight(cell: ICellModel) {
      self.end.column = cell.columnName;
    },
    moveTop(cell: ICellModel) {
      self.start.row = cell.rowName;
    }
  }));

export type IElement = typeof elementModel.Type;
