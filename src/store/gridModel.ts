import { types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

export const defaultGrid = {
  noOfColumns: 12,
  noOfRows: 12,
  cellWidth: 1,
  cellHeigt: 1,
  gridGap: '6px'
};

export type IGridData = typeof defaultGrid;

export function createGridModelInitialData({ noOfColumns, noOfRows, ...theRest }: IGridData) {
  const columns = [...Array(noOfColumns + 1).keys()].map((_, index) => 'columns-' + index);
  const rows = [...Array(noOfRows + 1).keys()].map((_, index) => 'rows-' + index);
  return {
    columns,
    rows,
    ...theRest
  };
}

const coordinatesModel = types.model('coordinates', {
  column: types.string,
  row: types.string
});

const dragModel = types.model('drag', {
  start: types.model({
    column: types.number,
    row: types.number
  }),
  end: types.model({
    column: types.number,
    row: types.number
  })
});

const elementModel = types.model('element', {
  start: coordinatesModel,
  end: coordinatesModel
});

export type IElement = typeof elementModel.Type;

export const gridModel = types
  .model('grid', {
    id: types.optional(types.identifier, uuid()),
    columns: types.array(types.string),
    rows: types.array(types.string),
    gridGap: '',
    cellWidth: 1,
    cellHeight: 1,
    drag: types.maybe(dragModel),
    elements: types.array(elementModel)
  })
  .actions(self => ({
    addElement() {
      if (self.drag) {
        const { start: dragStart, end: dragEnd } = self.drag;
        const data = {
          start: { column: self.columns[dragStart.column], row: self.rows[dragStart.row] },
          end: { column: self.columns[dragEnd.column], row: self.rows[dragEnd.row] }
        };
        self.elements.push(elementModel.create(data));
      }
      this.resetDrag();
    },
    resetDrag() {
      self.drag = undefined;
    },
    moveDrag(column: number, row: number) {
      const drag = self.drag!;
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
    startDrag(column: number, row: number) {
      self.drag = dragModel.create({ start: { column, row }, end: { column: column + 1, row: row + 1 } });
    },
    updateField(name: string, value: string | number) {
      if (typeof self[name] === 'number') {
        value = Number(value);
        if (isNaN(value) || value < 0) {
          return;
        }
        self[name] = value;
      }
    },
    changeGridItems(which: 'columns' | 'rows', action: 'increment' | 'decrement') {
      const field = self[which];
      if (action === 'increment') {
        field.push(`${which}-${field.length}`);
      }
      if (action === 'decrement') {
        field.pop();
      }
    }
  }));

export type IGridModel = typeof gridModel.Type;