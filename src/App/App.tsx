import * as React from 'react';

import { ResourcesPanel } from 'src/App/ResourcesPanel';
import { StylesPanel } from 'src/App/StylesPanel';
import { Workingbench } from 'src/App/Workingbench';

import css from './App.module.scss';

export class App extends React.Component {
  render() {
    return (
      <div className={css.app}>
        <div className={css.menu}>Menu</div>
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
