import * as React from 'react';

import { Cell } from './Cell';
import { DragArea } from './DragArea';

function generateCells(rows: string[], columns: string[]) {
  const cells = [];
  // tslint:disable-next-line prefer-for-of
  for (let i = 0; i < rows.length; i++) {
    // tslint:disable-next-line prefer-for-of
    for (let j = 0; j < columns.length; j++) {
      cells.push(
        <Cell
          key={rows[i] + columns[j]}
          columnStart={columns[j]}
          rowStart={rows[i]}
          columnEnd={columns[j + 1] || 'end'}
          rowEnd={rows[i + 1] || 'end'}
        />
      );
    }
  }
  return cells;
}

export class Guides extends React.Component<{ columns: string[]; rows: string[] }, {}> {
  render() {
    const { columns, rows } = this.props;
    return (
      <>
        <DragArea />
        {generateCells(rows, columns)}
      </>
    );
  }
}
