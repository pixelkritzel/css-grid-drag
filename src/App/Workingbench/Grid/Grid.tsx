import * as React from 'react';

import { Guides } from './Guides';

import { IGrid } from 'src/store';

export class Grid extends React.Component<{ grid: IGrid }, {}> {
  render() {
    const { grid } = this.props;
    const gridStyles = {
      display: 'grid',
      gridTemplate: `repeat(${grid.rows}, 1fr) / repeat(${grid.columns}, 1fr)`,
      gridGap: grid.gridGap
    };
    return (
      <div style={gridStyles}>
        <Guides columns={grid.columns} rows={grid.rows} />
      </div>
    );
  }
}
