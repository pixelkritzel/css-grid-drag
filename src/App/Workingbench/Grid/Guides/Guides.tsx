import * as React from 'react';

import { Cell } from './Cell';
import { Placement } from './Placement';

import { IGridModel } from 'src/store/gridModel';

function generateCells(gridStore: IGridModel, columns: string[], rows: string[]) {
  const cells = [];
  // tslint:disable-next-line prefer-for-of
  for (let i = 0; i < rows.length - 1; i++) {
    // tslint:disable-next-line prefer-for-of
    for (let j = 0; j < columns.length - 1; j++) {
      cells.push(
        <Cell
          key={rows[i] + columns[j]}
          gridStore={gridStore}
          columnName={columns[j]}
          columnIndex={j}
          rowName={rows[i]}
          rowIndex={i}
        />
      );
    }
  }
  return cells;
}

export class Guides extends React.Component<{ gridStore: IGridModel; columns: string[]; rows: string[] }, {}> {
  render() {
    const { gridStore, columns, rows } = this.props;
    return (
      <>
        <Placement gridStore={gridStore} />
        {generateCells(gridStore, columns, rows)}
      </>
    );
  }
}
