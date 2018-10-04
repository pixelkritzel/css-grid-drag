import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IStore, store } from 'src/store';

import css from './DragArea.module.scss';

@inject('store')
@observer
export class DragArea extends React.Component<{ store?: IStore }, {}> {
  render() {
    if (store.drag) {
      const { column, row } = this.props.store!.drag!.start!;
      const style = {
        gridColumnStart: column,
        gridColumnEnd: store.drag.end ? store.drag.end.column : 'span 1',
        gridRowStart: row,
        gridRowEnd: store.drag.end ? store.drag.end.row : 'span 1'
      };
      return <div className={css.dragArea} style={style} />;
    } else {
      return null;
    }
  }
}
