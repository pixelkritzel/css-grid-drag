import { destroy, detach, getRoot, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { elementModel, IElement } from './elementModel';
import { IStore } from './store';

export type ICellId = string;

export type ICell = {
  id: ICellId;
  columnName: string;
  columnIndex: number;
  rowName: string;
  rowIndex: number;
};

export const cellType = types.string;

export const defaultGrid = {
  noOfColumns: 12,
  noOfRows: 12,
  cellWidth: 1,
  cellHeigt: 1,
  startWidth: 768,
  gridGap: '6px'
};

export type IGridData = typeof defaultGrid;

export function createGridModelInitialData({ noOfColumns, noOfRows, ...theRest }: IGridData) {
  const columns = [...Array(noOfColumns + 1).keys()].map(_ => 'column-' + uuid());
  const rows = [...Array(noOfRows + 1).keys()].map(_ => 'row-' + uuid());
  return {
    id: uuid(),
    columns,
    rows,
    ...theRest
  };
}

export const gridModel = types
  .model('grid', {
    id: types.optional(types.identifier, uuid()),
    startWidth: types.number,
    columns: types.array(types.string),
    rows: types.array(types.string),
    gridGap: '',
    cellWidth: 1,
    cellHeight: 1,
    elements: types.array(elementModel)
  })
  .views(self => ({
    get cells(): ICell[] {
      const { columns, rows } = self;
      const cells = [];
      for (let i = 0; i < rows.length - 1; i++) {
        // tslint:disable-next-line prefer-for-of
        for (let j = 0; j < columns.length - 1; j++) {
          cells.push({
            id: `cell-${columns[j]}-${rows[i]}`,
            columnName: columns[j],
            columnIndex: j,
            rowName: rows[i],
            rowIndex: i
          });
        }
      }
      return cells;
    }
  }))
  .views(self => ({
    getCellInstance(cellId: string) {
      return self.cells.find(cell => cell.id === cellId);
    }
  }))
  .actions(self => ({
    addElement(element: IElement) {
      self.elements.push(element);
    },
    removeElement(element: IElement) {
      const store = getRoot(self) as IStore;
      store.unsetSelectedElement();
      detach(element);
      setTimeout(() => destroy(element));
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
    changeGridItems(which: 'columns' | 'rows', action: 'increment' | 'decrement') {
      const field = self[which];
      if (action === 'increment') {
        const newElement = `${which}-${uuid()}`;
        field.push(newElement);
      }
      if (action === 'decrement') {
        field.pop();
      }
    }
  }));

export type IGridModel = typeof gridModel.Type;
