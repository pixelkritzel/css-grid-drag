import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Element } from './Element';
import { Guides } from './Guides';

import { IStore } from 'src/store';

function generateGridDefintionFromNames(names: string[]) {
  return names.reduce((prev, name, index) => `${prev} [${name}] ${index < names.length - 1 ? ' 1fr' : ''}`, '');
}

@inject('store')
@observer
export class Grid extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    const { shownMediaQuery } = store!;
    const { grid } = store!.data;
    const gridStyles = {
      display: 'grid',
      gridTemplateRows: generateGridDefintionFromNames(shownMediaQuery.rows),
      gridTemplateColumns: generateGridDefintionFromNames(shownMediaQuery.columns),
      gridGap: shownMediaQuery.gridGap
    };

    return (
      <div style={gridStyles}>
        <Guides />
        {grid.elements.map(element => (
          <Element key={`element-${element.id}`} element={element} grid={grid} />
        ))}
      </div>
    );
  }
}
