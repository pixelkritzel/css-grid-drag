import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import * as cx from 'classnames';

import { IGridModel } from 'src/store/gridModel';
import { IUiStore } from 'src/store/uiStore';

import CSS from './Cell.module.scss';

type ICellProps = {
  gridStore: IGridModel;
  columnName: string;
  columnIndex: number;
  rowName: string;
  rowIndex: number;
  uiStore?: IUiStore;
};

@inject('uiStore')
@observer
export class Cell extends React.Component<ICellProps, {}> {
  @observable
  isDragOver = false;

  onDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    this.isDragOver = true;
  };

  onDragLeave = () => {
    this.isDragOver = false;
  };

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { columnIndex, rowIndex, gridStore, uiStore } = this.props;
    uiStore!.startElementPlacement(columnIndex, rowIndex, uiStore!.draggedResource!, gridStore);
    uiStore!.dropDraggedResource();
    this.isDragOver = false;
  };

  moveDrag = () => {
    const { columnIndex, rowIndex, uiStore } = this.props;
    uiStore!.moveDrag(columnIndex, rowIndex);
  };

  render() {
    const { columnName, rowName, gridStore, uiStore } = this.props;
    const style = {
      gridColumn: `${columnName} / span 1`,
      gridRow: `${rowName} / span 1`,
      paddingBottom: (gridStore.cellHeight / gridStore.cellWidth) * 100 + '%'
    };
    return (
      <div
        className={cx(CSS.cell, { [CSS.isDragOver]: this.isDragOver })}
        style={style}
        onDragEnter={uiStore!.draggedResource ? this.onDragEnter : undefined}
        onDragLeave={uiStore!.draggedResource ? this.onDragLeave : undefined}
        onDragOver={uiStore!.draggedResource ? e => e.preventDefault() : undefined}
        onDrop={uiStore!.draggedResource ? this.onDrop : undefined}
        onMouseEnter={uiStore!.placement ? this.moveDrag : undefined}
        onMouseUp={uiStore!.placement ? () => uiStore!.addElementToGrid() : undefined}
      />
    );
  }
}
