import { onPatch, types } from 'mobx-state-tree';

import { defaultGrid, gridModel, IGridData, createGridModelInitialData } from './gridModel';
import { resourceModel } from './resourceModel';

const defaultInitialData = {
  grids: [createGridModelInitialData(defaultGrid)],
  resources: [{ url: 'https://placekitten.com/300/400' }, { url: 'https://placekitten.com/400/300' }]
};

const storeModel = types
  .model('store', {
    grids: types.array(gridModel),
    resources: types.array(resourceModel)
  })
  .actions(self => ({
    addGrid(gridData: IGridData) {
      self.grids.push(gridModel.create(createGridModelInitialData(gridData)));
    },
    addRessource(url: string) {
      self.resources.push(resourceModel.create({ url }));
    }
  }));

function createStore(initialData: {} = defaultInitialData) {
  return storeModel.create(initialData);
}

export type IStore = typeof storeModel.Type;

export const store = createStore();

onPatch(store, () => console.log(JSON.stringify(store, undefined, 2)));
