import { types } from 'mobx-state-tree';

import { defaultGrid, gridModel, IGridData, createGridModelInitialData } from './gridModel';

const defaultInitialData = {
  grids: [createGridModelInitialData(defaultGrid)]
};

const storeModel = types
  .model('store', {
    grids: types.array(gridModel)
  })
  .actions(self => ({
    addGrid(gridData: IGridData) {
      self.grids.push(gridModel.create(createGridModelInitialData(gridData)));
    }
  }));

function createStore(initialData: {} = defaultInitialData) {
  return storeModel.create(initialData);
}

export type IStore = typeof storeModel.Type;

export const store = createStore();
