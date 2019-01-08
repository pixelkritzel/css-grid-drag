import * as React from 'react';

import { MenuPanel } from './MenuPanel';
import { ResourcesPanel } from './ResourcesPanel';
import { StylesPanel } from './StylesPanel';
import { Workingbench } from './Workingbench';

import css from './App.module.scss';

export class App extends React.Component {
  render() {
    return (
      <div className={css.app}>
        <div className={css.menu}>
          <MenuPanel />
        </div>
        <div className={css.workingbench}>
          <Workingbench />
        </div>
        <div className={css.stylesPanel}>
          <StylesPanel />
        </div>
        <div className={css.resourcesPanel}>
          <ResourcesPanel />
        </div>
      </div>
    );
  }
}
