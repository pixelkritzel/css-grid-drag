import { types, Instance } from 'mobx-state-tree';

export const cellModel = types.model('cell', {
  id: types.identifier,
  columnIndex: types.number,
  rowIndex: types.number,
  columnName: types.string,
  rowName: types.string
});

export type ICellModel = Instance<typeof cellModel>;
