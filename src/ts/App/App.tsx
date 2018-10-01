import * as React from 'react';

const css = require('./App.scss');

export class App extends React.Component {
  render() {
    return (
      <div className={css.app}>
        <div className={css.menu}>Menu</div>
        <div className={css.workingbench}>Working bench</div>
        <div className={css.stylesPanel}>Styles Panel</div>
        <div className={css.resourcesPanel}>Resources Panel</div>
      </div>
    );
  }
}