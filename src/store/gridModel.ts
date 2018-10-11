import { types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';
import { IResource, resourceModel } from './resourceModel';

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

const placementModel = types
  .model('placementModel', {
    _start: types.model({
      column: types.number,
      row: types.number
    }),
    end: types.model({
      column: types.number,
      row: types.number
    }),
    resource: types.reference(resourceModel)
  })
  .views(self => ({
    get start() {
      const start = { ...self._start };
      if (self.end.column < self._start.column) {
        start.column++;
      }
      if (self.end.row < self._start.row) {
        start.row++;
      }
      return start;
    }
  }));

const elementModel = types.model('element', {
  start: coordinatesModel,
  end: coordinatesModel,
  resource: types.reference(resourceModel)
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
    placement: types.maybe(placementModel),
    elements: types.array(elementModel)
  })
  .actions(self => ({
    addElement() {
      if (self.placement) {
        const { start: dragStart, end: dragEnd, resource } = self.placement;
        const data = {
          start: { column: self.columns[dragStart.column], row: self.rows[dragStart.row] },
          end: { column: self.columns[dragEnd.column], row: self.rows[dragEnd.row] },
          resource
        };
        self.elements.push(elementModel.create(data));
      }
      this.resetDrag();
    },
    resetDrag() {
      self.placement = undefined;
    },
    moveDrag(column: number, row: number) {
      const drag = self.placement!;
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
    startElementPlacement(column: number, row: number, resource: IResource) {
      self.placement = placementModel.create({
        _start: { column, row },
        end: { column: column + 1, row: row + 1 },
        resource
      });
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
        field.push(`${which}-${field.length}`);
      }
      if (action === 'decrement') {
        field.pop();
      }
    }
  }));

export type IGridModel = typeof gridModel.Type;
