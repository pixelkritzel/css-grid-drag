import * as React from 'react';

import { ElementsList } from './ElementsList';
import { GridForm } from './GridForm';

import CSS from './StylesPanel.module.scss';

export class StylesPanel extends React.Component {
  render() {
    return (
      <div className={CSS.stylesPanel}>
        <GridForm />
        <ElementsList />
      </div>
    );
  }
}
