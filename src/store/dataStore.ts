import { destroy, Instance, types } from 'mobx-state-tree';

import { defaultGrid, gridModel } from './gridModel';
import { createGridModelInitialData } from './gridModel';
import { resourceModel, IResource } from './resourceModel';

export function getDefaultData() {
  return {
    grids: [createGridModelInitialData(defaultGrid)],
    resources: [{ url: 'https://placekitten.com/300/400' }, { url: 'https://placekitten.com/400/300' }]
  };
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
