import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IStore } from 'src/store';

import CSS from './Cell.module.scss';

type ICellProps = {
  columnStart: string;
  columnEnd: string;
  rowStart: string;
  rowEnd: string;
  store?: IStore;
};

@inject('store')
@observer
export class Cell extends React.Component<ICellProps, {}> {
  render() {
    const { columnStart, columnEnd, rowStart, rowEnd } = this.props;
    const store = this.props.store!;
    const style = {
      gridColumn: `${columnStart} / span 1`,
      gridRow: `${rowStart} / span 1`
    };
    return (
      <div
        className={CSS.cell}
        style={style}
        onMouseDown={_ => store.setDragStart(rowStart, columnStart)}
        onMouseMove={store.drag ? () => store.setDragEnd(rowEnd, columnEnd) : undefined}
        onMouseUp={store.drag ? () => store.addElement() : undefined}
      />
    );
  }
}
