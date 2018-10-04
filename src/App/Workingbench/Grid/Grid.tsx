import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Element } from './Element';
import { Guides } from './Guides';

import { IGridModel, IStore } from 'src/store';

function generateGridDefintionFromNames(names: string[]) {
  return names.reduce((prev, name) => `${prev} [${name}] 1fr`, '').trim() + ' [end]';
}

@inject('store')
@observer
export class Grid extends React.Component<{ grid: IGridModel; store?: IStore }, {}> {
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
        {this.props.store!.elements.map(element => (
          <Element element={element} />
        ))}
        <Guides columns={grid.columns} rows={grid.rows} />
      </div>
    );
  }
}
