import * as React from 'react';

import { StylesPanel } from 'src/App/Components/StylesPanel';
import { Workingbench } from 'src/App/Components/Workingbench';

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
        <div className={css.resourcesPanel}>Resources Panel</div>
      </div>
    );
  }
}
