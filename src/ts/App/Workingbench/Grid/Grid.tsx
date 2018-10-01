import * as React from 'react';

import { IGrid } from 'src/ts/store';

function generateDivs(number: number) {
  const divs = [];
  for (let i = 1; i <= number; i++) {
    divs.push(<div>{`No. ${i}`}</div>);
  }
  return divs;
}

export class Grid extends React.Component<{ grid: IGrid }, {}> {
  render() {
    const { grid } = this.props;
    const gridStyles = {
      display: 'grid',
      gridTemplate: `repeat(${grid.rows}, 1fr) / repeat(${grid.columns}, 1fr)`,
      gridGap: grid.gridGap
    };
    return <div style={gridStyles}>{generateDivs(grid.rows * grid.columns)}</div>;
  }
}
