import { destroy, onSnapshot, types } from 'mobx-state-tree';

import { defaultGrid, gridModel, IGridData, createGridModelInitialData } from './gridModel';
import { resourceModel, IResource } from './resourceModel';

const defaultInitialData = {
  grids: [createGridModelInitialData(defaultGrid)],
  resources: [{ url: 'https://placekitten.com/300/400' }, { url: 'https://placekitten.com/400/300' }]
};

let initialData: typeof storeModel.CreationType;

const localStorageKey = 'css-grid-drag-store';

const localData = localStorage.getItem(localStorageKey);
if (localData) {
  initialData = JSON.parse(localData);
} else {
  initialData = defaultInitialData;
}

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
    },
    deleteResource(resource: IResource) {
      destroy(resource);
    }
  }));

function createStore(data: {} = initialData) {
  return storeModel.create(data);
}

export type IStore = typeof storeModel.Type;

export const store = createStore();

onSnapshot(store, snapShot => localStorage.setItem(localStorageKey, JSON.stringify(snapShot, undefined, 2)));
