import { types, destroy } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { elementModel, IElement } from './elementModel';

export const defaultGrid = {
  noOfColumns: 12,
  noOfRows: 12,
  cellWidth: 1,
  cellHeigt: 1,
  gridGap: '6px'
};

export type IGridData = typeof defaultGrid;

export function createGridModelInitialData({ noOfColumns, noOfRows, ...theRest }: IGridData) {
  const columns = [...Array(noOfColumns + 1).keys()].map(_ => 'column-' + uuid());
  const rows = [...Array(noOfRows + 1).keys()].map(_ => 'row-' + uuid());
  return {
    columns,
    rows,
    ...theRest
  };
}

export const gridModel = types
  .model('grid', {
    id: types.optional(types.identifier, uuid()),
    columns: types.array(types.string),
    rows: types.array(types.string),
    gridGap: '',
    cellWidth: 1,
    cellHeight: 1,
    elements: types.array(elementModel)
  })
  .actions(self => ({
    addElement(element: IElement) {
      self.elements.push(element);
    },
    updateField(name: string, value: string | number) {
      if (typeof self[name] === 'number') {
        value = Number(value);
        if (isNaN(value) || value < 0) {
          return;
        }
      }
      self[name] = value;
    },
    changeGridItems(which: 'columns' | 'rows', action: 'increment' | 'decrement', position: 'start' | 'end') {
      const field = self[which];
      if (action === 'increment') {
        const newElement = `${which}-${uuid()}`;
        if (position === 'start') {
          field.unshift(newElement);
        } else {
          field.push(newElement);
        }
      }
      if (action === 'decrement') {
        if (position === 'start') {
          field.shift();
        }
        {
          field.pop();
        }
      }
    },
    removeElement(element: IElement) {
      destroy(element);
    }
  }));

export type IGridModel = typeof gridModel.Type;
