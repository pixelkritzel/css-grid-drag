import * as React from 'react';
import { observer, inject } from 'mobx-react';

import css from './Placement.module.scss';
import { IStore } from 'src/store/store';

@inject('store')
@observer
export class Placement extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    if (store!.placement) {
      const { width, height, resource } = store!.placement!;
      const start = store!.placement!.start();
      const style = {
        // CSS grids numbering is based on one and this are array indexes based on zero, hence the +1
        gridColumnStart: start.columnIndex + 1,
        gridColumnEnd: `span ${width}`,
        gridRowStart: start.rowIndex + 1,
        gridRowEnd: `span ${height}`,
        backgroundImage: `url(${resource.url})`
      };

      return <div className={css.dragArea} style={style} />;
    } else {
      return null;
    }
  }
}
