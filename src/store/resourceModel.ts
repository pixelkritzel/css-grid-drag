import { types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

export const resourceModel = types.model('resourceModel', {
  id: types.optional(types.identifier, uuid),
  url: types.string
});

export type IResource = typeof resourceModel.Type;
