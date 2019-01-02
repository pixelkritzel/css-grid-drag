import { types, Instance } from 'mobx-state-tree';
import { cellModel } from './cellModel';
import { IGridData } from './gridModel';
import * as uuid from 'uuid/v4';

export function createCssGridModelInitialData({ noOfColumns, noOfRows, ...theRest }: IGridData) {
  const columns = [...Array(noOfColumns + 1).keys()].map(_ => 'column-' + uuid());
  const rows = [...Array(noOfRows + 1).keys()].map(_ => 'row-' + uuid());
  return {
    columns,
    rows,
    ...theRest
  };
}

export const cssGridModel = types
  .model('cssGridModel', {
    id: types.optional(types.identifier, uuid),
    mediaQuery: types.string,
    columns: types.array(types.string),
    rows: types.array(types.string),
    gridGap: '',
    cellWidth: 1,
    cellHeight: 1
  })
  .views(self => ({
    get cells() {
      const { columns, rows } = self;
      const cells = [];
      for (let i = 0; i < rows.length - 1; i++) {
        // tslint:disable-next-line prefer-for-of
        for (let j = 0; j < columns.length - 1; j++) {
          cells.push(
            cellModel.create({
              id: `cell-${columns[j]}-${rows[i]}`,
              columnName: columns[j],
              columnIndex: j,
              rowName: rows[i],
              rowIndex: i
            })
          );
        }
      }
      return cells;
    }
  }))
  .actions(self => ({
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
    }
  }));

export type ICssGrid = Instance<typeof cssGridModel>;
