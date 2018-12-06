import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import * as cx from 'classnames';

import { ICellModel } from 'src/store/cellModel';
import { IGridModel } from 'src/store/gridModel';
import { IUiStore } from 'src/store/uiStore';

import CSS from './Cell.module.scss';

type ICellProps = {
  gridStore: IGridModel;
  cellInstance: ICellModel;
  uiStore?: IUiStore;
};

@inject('uiStore')
@observer
export class Cell extends React.Component<ICellProps, {}> {
  @observable
  isDragOver = false;

  onDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const { cellInstance, uiStore } = this.props;
    this.isDragOver = true;
    uiStore!.dragOverCell(cellInstance);
  };

  onDragLeave = () => {
    const { uiStore } = this.props;
    this.isDragOver = false;
    uiStore!.dragOverCell(undefined);
  };

  onDrop = () => {
    const { cellInstance, uiStore } = this.props;
    uiStore!.dropOverCell(cellInstance);
    this.isDragOver = false;
  };

  onMouseEnter = () => {
    const { cellInstance, uiStore } = this.props;
    uiStore!.mouseOverCell(cellInstance);
  };

  onMouseUp = () => {
    const { cellInstance, uiStore } = this.props;
    uiStore!.mouseUpCell(cellInstance);
  };

  render() {
    const { cellInstance, gridStore } = this.props;
    const { columnName, rowName } = cellInstance;
    const style = {
      gridColumn: `${columnName} / span 1`,
      gridRow: `${rowName} / span 1`,
      paddingBottom: (gridStore.cellHeight / gridStore.cellWidth) * 100 + '%'
    };
    return (
      <div
        className={cx(CSS.cell, { [CSS.isDragOver]: this.isDragOver })}
        style={style}
        onDragOver={e => e.preventDefault()}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onMouseEnter={this.onMouseEnter}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}
