import * as React from 'react';
import { observer } from 'mobx-react';

import { Element } from './Element';
import { Guides } from './Guides';

import { IGridModel } from 'src/store/gridModel';

function generateGridDefintionFromNames(names: string[]) {
  return names.reduce((prev, name, index) => `${prev} [${name}] ${index < names.length - 1 ? ' 1fr' : ''}`, '');
}

@observer
export class Grid extends React.Component<{ grid: IGridModel }, {}> {
  render() {
    const { grid } = this.props;
    const gridStyles = {
      display: 'grid',
      gridTemplateRows: generateGridDefintionFromNames(grid.rows),
      gridTemplateColumns: generateGridDefintionFromNames(grid.columns),
      gridGap: grid.gridGap
    };

    return (
      <div style={gridStyles}>
        {grid.elements.map(element => (
          <Element element={element} />
        ))}
        <Guides gridStore={grid} columns={grid.columns} rows={grid.rows} />
      </div>
    );
  }
}
