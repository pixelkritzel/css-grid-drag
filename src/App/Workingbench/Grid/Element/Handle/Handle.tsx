import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as cx from 'classnames';
import { throttle } from 'lodash';

import CSS from './Handle.module.scss';

import { IUiStore } from 'src/store/uiStore';

type IHandleProps = {
  uiStore?: IUiStore;
  movementType: 'moveTop' | 'moveRight' | 'moveBottom' | 'moveLeft';
};

@inject('uiStore')
@observer
export class Handle extends React.Component<IHandleProps> {
  moveTop = () => {
    const { uiStore } = this.props;
    const { draggedOverCell, selectedElement } = uiStore!;
    uiStore!.setCurrentAction('ELEMENT_MOVE');
    if (draggedOverCell) {
      selectedElement!.moveTop(draggedOverCell);
    }
  };

  moveRight = () => {
    const { uiStore } = this.props;
    const { draggedOverCell, selectedElement, shownGrid } = uiStore!;
    uiStore!.setCurrentAction('ELEMENT_MOVE');
    if (draggedOverCell) {
      const cellRight = shownGrid.cells.find(
        cell => cell.columnName === shownGrid.columns[draggedOverCell.columnIndex + 1]
      );
      if (cellRight) {
        selectedElement!.moveRight(cellRight);
      }
    }
  };

  moveBottom = () => {
    const { uiStore } = this.props;
    const { draggedOverCell, selectedElement, shownGrid } = uiStore!;
    uiStore!.setCurrentAction('ELEMENT_MOVE');
    if (draggedOverCell) {
      const cellBelow = shownGrid.cells.find(cell => cell.rowName === shownGrid.rows[draggedOverCell.rowIndex + 1]);
      if (cellBelow) {
        selectedElement!.moveBottom(cellBelow);
      }
    }
  };

  moveLeft = () => {
    const { uiStore } = this.props;
    const { draggedOverCell, selectedElement } = uiStore!;
    uiStore!.setCurrentAction('ELEMENT_MOVE');
    if (draggedOverCell) {
      selectedElement!.moveLeft(draggedOverCell);
    }
  };

  resetCurrentAction = () => {
    const { uiStore } = this.props;
    uiStore!.setCurrentAction(undefined);
  };

  render() {
    const { movementType } = this.props;
    return (
      <div
        className={cx(CSS.handle, CSS[movementType])}
        draggable
        onDragEnd={this.resetCurrentAction}
        onDrag={throttle(this[movementType], 16)}
      />
    );
  }
}
