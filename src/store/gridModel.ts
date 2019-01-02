import { types, destroy } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { elementModel, IElement } from './elementModel';
import { cssGridModel } from './cssGridModel';

export const defaultGrid = {
  mediaQuery: '',
  noOfColumns: 12,
  noOfRows: 12,
  cellWidth: 1,
  cellHeigt: 1,
  gridGap: '6px'
};

export type IGridData = typeof defaultGrid;

export const gridModel = types
  .model('grid', {
    id: types.optional(types.identifier, uuid()),
    mediaQueries: types.array(cssGridModel),
    elements: types.array(elementModel)
  })
  .actions(self => ({
    addElement(element: IElement) {
      self.elements.push(element);
    },
    removeElement(element: IElement) {
      destroy(element);
    }
  }));

export type IGridModel = typeof gridModel.Type;
