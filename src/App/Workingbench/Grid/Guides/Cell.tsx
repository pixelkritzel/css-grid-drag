import * as React from 'react';

import CSS from './Cell.module.scss';

export class Cell extends React.Component {
  render() {
    return <div className={CSS.cell} />;
  }
}
