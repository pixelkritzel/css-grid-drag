import { types } from 'mobx-state-tree';

import { gridModel, createGridModelInitialData, defaultGrid } from './gridModel';

const storeModel = types.model('store', {
  grids: types.array(gridModel)
});

function createStore(initialData?: {}) {
  if (!initialData) {
    initialData = {
      grids: [createGridModelInitialData(defaultGrid)]
    };
  }
  return storeModel.create(initialData);
}

export type IStore = typeof storeModel.Type;

export const store = createStore();
