import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import * as cx from 'classnames';

import { ICellModel } from 'src/store/cellModel';
import { IStore } from 'src/store/store';

import CSS from './Cell.module.scss';

type ICellProps = {
  cellInstance: ICellModel;
  store?: IStore;
};

@inject('store')
@observer
export class Cell extends React.Component<ICellProps, {}> {
  @observable
  isDragOver = false;

  onDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const { cellInstance, store } = this.props;
    this.isDragOver = true;
    setTimeout(() => store!.dragOverCell(cellInstance));
  };

  onDragLeave = () => {
    const { store } = this.props;
    this.isDragOver = false;
    store!.dragOverCell(undefined);
  };

  onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const { cellInstance, store } = this.props;
    store!.dropOverCell(cellInstance);
    this.isDragOver = false;
  };

  onMouseEnter = () => {
    const { cellInstance, store } = this.props;
    store!.mouseOverCell(cellInstance);
  };

  onMouseUp = () => {
    const { cellInstance, store } = this.props;
    store!.mouseUpCell(cellInstance);
  };

  render() {
    const { cellInstance, store } = this.props;
    const { isCellHighlight, isExport, isGuidesFront } = store!;
    const { columnName, rowName } = cellInstance;
    const style = {
      gridColumn: `${columnName} / span 1`,
      gridRow: `${rowName} / span 1`
    };
    return (
      <div
        className={
          isExport
            ? undefined
            : cx(CSS.cell, {
                [CSS.isDragOver]: this.isDragOver && isCellHighlight,
                [CSS.isGuidesFront]: isGuidesFront
              })
        }
        style={style}
        data-css-grid-drag-cell
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
