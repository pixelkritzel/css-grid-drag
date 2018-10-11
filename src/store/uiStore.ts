import { types } from 'mobx-state-tree';

import { IResource, resourceModel } from './resourceModel';

const uiModel = types
  .model('ui', {
    draggedResource: types.maybe(types.reference(resourceModel))
  })
  .actions(self => ({
    dropDraggedResource() {
      self.draggedResource = undefined;
    },
    setDraggedResource(resource: IResource) {
      self.draggedResource = resource;
    }
  }));

export const uiStore = uiModel.create();

export type IUiStore = typeof uiModel.Type;
