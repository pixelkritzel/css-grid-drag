import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { ElementsList } from './ElementsList';
import { GridForm } from './GridForm';

import { IStore } from 'src/store';

import CSS from './StylesPanel.module.scss';

@inject('store')
@observer
export class StylesPanel extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { data: dataStore } = this.props.store!;
    return (
      <div className={CSS.stylesPanel}>
        <GridForm mediaQuery={dataStore!.grid.mediaQueries[0]} />
        <ElementsList />
      </div>
    );
  }
}
