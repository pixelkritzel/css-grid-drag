import { types } from 'mobx-state-tree';

import { cellModel, ICellModel } from './cellModel';
import { resourceModel } from './resourceModel';

export const placementModel = types
  .model('placementModel', {
    start: types.reference(cellModel),
    width: types.number,
    height: types.number,
    resource: types.reference(resourceModel)
  })
  .actions(self => ({
    movePlacementEnd(cell: ICellModel) {
      const { start } = self;
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
