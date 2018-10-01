const defaultGrid = {
  columns: 5,
  rows: 12,
  gridGap: '6px'
};

export type IGrid = typeof defaultGrid;

export const store = {
  grids: [defaultGrid]
};

export type IStore = typeof store;
