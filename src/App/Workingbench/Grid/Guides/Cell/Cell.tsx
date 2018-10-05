import * as React from 'react';
import { observer } from 'mobx-react';

import { IGridModel } from 'src/store/gridModel';

import CSS from './Cell.module.scss';

type ICellProps = {
  gridStore: IGridModel;
  columnName: string;
  columnIndex: number;
  rowName: string;
  rowIndex: number;
};

@observer
export class Cell extends React.Component<ICellProps, {}> {
  moveDrag = () => {
    const { columnIndex, rowIndex, gridStore } = this.props;
    gridStore.moveDrag(columnIndex, rowIndex);
  };

  render() {
    const { columnName, columnIndex, rowName, rowIndex, gridStore } = this.props;
    const style = {
      gridColumn: `${columnName} / span 1`,
      gridRow: `${rowName} / span 1`
    };
    return (
      <div
        className={CSS.cell}
        style={style}
        onMouseDown={_ => gridStore.startDrag(columnIndex, rowIndex)}
        onMouseEnter={gridStore.drag ? this.moveDrag : undefined}
        onMouseUp={gridStore.drag ? () => gridStore.addElement() : undefined}
      />
    );
  }
}
