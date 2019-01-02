import { destroy, Instance, onSnapshot, types } from 'mobx-state-tree';

import { defaultGrid, gridModel } from './gridModel';
import { createGridModelInitialData } from './gridModel';
import { resourceModel, IResource } from './resourceModel';

const defaultInitialData = {
  grids: [createGridModelInitialData(defaultGrid)],
  resources: [{ url: 'https://placekitten.com/300/400' }, { url: 'https://placekitten.com/400/300' }]
};

let initialData: typeof dataStoreModel.CreationType;

const localStorageKey = 'css-grid-drag-store';

const localData = localStorage.getItem(localStorageKey);
if (localData) {
  initialData = JSON.parse(localData);
} else {
  initialData = defaultInitialData;
}

export const dataStoreModel = types
  .model('dataStore', {
    grids: types.array(gridModel),
    resources: types.array(resourceModel)
  })
  .actions(self => ({
    addRessource(url: string) {
      self.resources.push(resourceModel.create({ url }));
    },
    deleteResource(resource: IResource) {
      destroy(resource);
    }
  }));

export type IDataStore = Instance<typeof dataStoreModel>;

export const dataStore = dataStoreModel.create(initialData);

onSnapshot(dataStore, snapShot => localStorage.setItem(localStorageKey, JSON.stringify(snapShot, undefined, 2)));
