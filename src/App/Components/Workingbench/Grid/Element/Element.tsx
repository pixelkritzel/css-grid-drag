import * as React from 'react';

import { IElement } from 'src/store/gridModel';

export class Element extends React.Component<{ element: IElement }, {}> {
  render() {
    const { start, end } = this.props.element;
    const style = {
      gridColumnStart: start.column,
      gridColumnEnd: end.column,
      gridRowStart: start.row,
      gridRowEnd: end.row,
      border: '5px solid violet'
    };
    return <div style={style} />;
    return <div style={{}} />;
  }
}
