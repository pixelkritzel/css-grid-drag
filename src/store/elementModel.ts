import { types } from 'mobx-state-tree';
import { resourceModel } from './resourceModel';
import * as uuid from 'uuid/v4';

const coordinatesModel = types.model('coordinates', {
  column: types.string,
  row: types.string
});

export const elementModel = types.model('element', {
  id: types.optional(types.identifier, uuid),
  start: coordinatesModel,
  end: coordinatesModel,
  resource: types.reference(resourceModel)
});

export type IElement = typeof elementModel.Type;
