import { types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

const defaultGrid = {
  columns: 12,
  rows: 12,
  gridGap: '6px'
};

const coordinatesModel = types.model('coordinates', {
  row: types.string,
  column: types.string
});

const dragModel = types.model('drag', {
  start: types.maybe(coordinatesModel),
  end: types.maybe(coordinatesModel)
});

const elementModel = types.model('element', {
  start: coordinatesModel,
  end: coordinatesModel
});

export type IElement = typeof elementModel.Type;

const gridModel = types.model('grid', {
  columns: types.array(types.string),
  rows: types.array(types.string),
  gridGap: ''
});

export type IGridModel = typeof gridModel.Type;

const storeModel = types
  .model('store', {
    grids: types.array(gridModel),
    drag: types.maybe(dragModel),
    elements: types.array(elementModel)
  })
  .actions(self => ({
    addElement() {
      if (self.drag && self.drag.start && self.drag.end) {
        const { start, end } = self.drag;
        const data = { start: { ...start }, end: { ...end } };
        self.elements.push(elementModel.create(data));
      }
      this.resetDrag();
    },
    resetDrag() {
      self.drag = undefined;
    },
    setDragEnd(row: string, column: string) {
      self.drag!.end = coordinatesModel.create({ row, column });
    },
    setDragStart(row: string, column: string) {
      self.drag = dragModel.create({ start: { row, column } });
    }
  }));

function createStore(initialData?: {}) {
  if (!initialData) {
    initialData = {
      grids: [
        {
          columns: [...Array(defaultGrid.columns).keys()].map(() => 'css-' + uuid()),
          rows: [...Array(defaultGrid.rows).keys()].map(() => 'css-' + uuid()),
          gridGap: defaultGrid.gridGap
        }
      ]
    };
  }
  return storeModel.create(initialData);
}

export type IStore = typeof storeModel.Type;

export const store = createStore();
