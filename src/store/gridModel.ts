import { types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

export const defaultGrid = {
  noOfColumns: 12,
  noOfRows: 12,
  gridGap: '6px'
};

export function createGridModelInitialData({ gridGap, noOfColumns, noOfRows }: typeof defaultGrid) {
  const columns = [...Array(noOfColumns + 1).keys()].map((_, index) => 'col-' + index);
  const rows = [...Array(noOfRows + 1).keys()].map((_, index) => 'row-' + index);
  return {
    columns,
    rows,
    gridGap
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
    }
  }));

export type IGridModel = typeof gridModel.Type;
