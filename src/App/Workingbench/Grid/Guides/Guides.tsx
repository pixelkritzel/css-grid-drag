import * as React from 'react';

import { Cell } from './Cell';
import { DragArea } from './DragArea';

import { IGridModel } from 'src/store/gridModel';

function generateCells(gridStore: IGridModel, columns: string[], rows: string[]) {
  const cells = [];
  // tslint:disable-next-line prefer-for-of
  for (let i = 0; i < rows.length; i++) {
    // tslint:disable-next-line prefer-for-of
    for (let j = 0; j < columns.length; j++) {
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
        <DragArea gridStore={gridStore} />
        {generateCells(gridStore, columns, rows)}
      </>
    );
  }
}
