import * as React from 'react';
import { observer } from 'mobx-react';

import { IGridModel } from 'src/store/gridModel';

import css from './DragArea.module.scss';

@observer
export class DragArea extends React.Component<{ gridStore: IGridModel }, {}> {
  render() {
    const { gridStore } = this.props;
    if (gridStore.drag) {
      const { start, end } = gridStore.drag;
      const style = {
        // CSS grids numbering is based on one and this are array indexes based on zero, hence the +1
        gridColumnStart: start.column + 1,
        gridColumnEnd: end.column + 1,
        gridRowStart: start.row + 1,
        gridRowEnd: end.row + 1
      };

      return <div className={css.dragArea} style={style} />;
    } else {
      return null;
    }
  }
}
