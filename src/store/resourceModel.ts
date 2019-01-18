import { getRoot, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';
import { some } from 'lodash';

export const resourceModel = types
  .model('resourceModel', {
    id: types.optional(types.identifier, uuid),
    url: types.string
  })
  .views(self => ({
    get isUsed() {
      const store = getRoot(self) as any;
      return some(store.data.grids, grid => some(grid.elements, element => element.resource === self));
    }
  }));

export type IResource = typeof resourceModel.Type;
