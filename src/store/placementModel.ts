import { types, getRoot } from 'mobx-state-tree';

import { resourceModel } from './resourceModel';
import { cellType, ICellId } from './gridModel';
import { IStore } from './store';

export const placementModel = types
  .model('placementModel', {
    _start: cellType,
    width: types.number,
    height: types.number,
    resource: types.reference(resourceModel)
  })
  .views(self => ({
    start() {
      const store = getRoot(self) as IStore;
      return store.shownGrid.getCellInstance(self._start)!;
    }
  }))
  .actions(self => ({
    movePlacementEnd(cellId: ICellId) {
      const start = self.start();
      const store = getRoot(self) as IStore;
      const cell = store.shownGrid!.getCellInstance(cellId)!;
      const width = cell.columnIndex - start.columnIndex + 1;
      const height = cell.rowIndex - start.rowIndex + 1;
      if (width > 0) {
        self.width = width;
      }
      if (height > 0) {
        self.height = height;
      }
    }
  }));
