import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { IGridModel } from 'src/store/gridModel';

import css from './Placement.module.scss';
import { IUiStore } from 'src/store/uiStore';

@inject('uiStore')
@observer
export class Placement extends React.Component<{ gridStore: IGridModel; uiStore?: IUiStore }, {}> {
  render() {
    const { uiStore } = this.props;
    if (uiStore!.placement) {
      const { start, end, resource } = uiStore!.placement!;
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
