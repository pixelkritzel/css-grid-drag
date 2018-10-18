import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { GridForm } from './GridForm';

import { IStore } from 'src/store';

import CSS from './StylesPanel.module.scss';

@inject('store')
@observer
export class StylesPanel extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    return (
      <div className={CSS.stylesPanel}>
        {store!.grids.map((grid, index) => (
          <GridForm key={`grid-styles-${index}`} gridStore={grid} />
        ))}
      </div>
    );
  }
}
