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
    const { shownGrid } = store!;
    const gridStyles = {
      display: 'grid',
      gridTemplateRows: generateGridDefintionFromNames(shownGrid.rows),
      gridTemplateColumns: generateGridDefintionFromNames(shownGrid.columns),
      gridGap: shownGrid.gridGap
    };

    return (
      <div style={gridStyles}>
        <Guides />
        {shownGrid.elements.map(element => (
          <Element key={`element-${element.id}`} element={element} />
        ))}
      </div>
    );
  }
}
