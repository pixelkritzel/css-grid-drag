import * as React from 'react';

import { IElement } from 'src/store/gridModel';

export class Element extends React.Component<{ element: IElement }, {}> {
  render() {
    const { start, end, resource } = this.props.element;
    const style = {
      gridColumnStart: start.column,
      gridColumnEnd: end.column,
      gridRowStart: start.row,
      gridRowEnd: end.row,
      backgroundImage: `url(${resource.url})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return <div style={style} />;
  }
}
