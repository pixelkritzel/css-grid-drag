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
      const { start, end, resource } = store!.placement!;
      const style = {
        // CSS grids numbering is based on one and this are array indexes based on zero, hence the +1
        gridColumnStart: start.columnIndex + 1,
        gridColumnEnd: end.columnIndex + 1,
        gridRowStart: start.rowIndex + 1,
        gridRowEnd: end.rowIndex + 1,
        backgroundImage: `url(${resource.url})`
      };

      return <div className={css.dragArea} style={style} />;
    } else {
      return null;
    }
  }
}
