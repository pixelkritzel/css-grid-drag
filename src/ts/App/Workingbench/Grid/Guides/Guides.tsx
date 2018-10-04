import * as React from 'react';

import { Cell } from './Cell';

function generateDivs(number: number) {
  const divs = [];
  for (let i = 1; i <= number; i++) {
    divs.push(<Cell />);
  }
  return divs;
}

export class Guides extends React.Component {
  render() {
    const { columns, rows } = this.props;
    return <>{generateDivs(rows * columns)}</>;
  }
}
