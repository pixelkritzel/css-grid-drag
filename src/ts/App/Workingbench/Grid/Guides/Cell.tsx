import * as React from 'react';

const CSS = require('./Cell.scss');

export class Cell extends React.Component {
  render() {
    return <div className={CSS.cell} />;
  }
}
