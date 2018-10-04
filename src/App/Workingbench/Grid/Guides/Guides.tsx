import * as React from 'react';

import { Cell } from './Cell';

function generateDivs(no: number) {
  const divs = [];
  for (let i = 1; i <= no; i++) {
    divs.push(<Cell />);
  }
  return divs;
}

export class Guides extends React.Component<{ columns: number; rows: number }, {}> {
  render() {
    const { columns, rows } = this.props;
    return <>{generateDivs(rows * columns)}</>;
  }
}
