import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as cx from 'classnames';

import { IElement } from 'src/store/elementModel';
import { IUiStore } from 'src/store/uiStore';

import CSS from './Element.module.scss';
import { IGridModel } from 'src/store/gridModel';

@inject('uiStore')
@observer
export class Element extends React.Component<{ element: IElement; grid: IGridModel; uiStore?: IUiStore }, {}> {
  isGlobalOnClickBound = false;

  onClick = (event: PointerEvent) => {
    console.log('onClick runs', Date.now());
    const target = event.target as HTMLDivElement;
    if (!target.matches('.element')) {
      this.props.uiStore!.unsetSelectedElement();
    }
  };

  componentDidUpdate() {
    const { element, uiStore } = this.props;
    if (uiStore!.selectedElement === element && !this.isGlobalOnClickBound) {
      document.addEventListener('click', this.onClick);
      this.isGlobalOnClickBound = true;
    }
    if (uiStore!.selectedElement !== element && this.isGlobalOnClickBound) {
      document.removeEventListener('click', this.onClick);
      this.isGlobalOnClickBound = false;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    this.isGlobalOnClickBound = false;
  }

  render() {
    const { element, uiStore } = this.props;
    const { start, end, resource } = element;
    const isSelected = uiStore!.selectedElement === element;
    const style = {
      gridColumnStart: start.column,
      gridColumnEnd: end.column,
      gridRowStart: start.row,
      gridRowEnd: end.row,
      backgroundImage: `url(${resource.url})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div
        className={cx('element', { [CSS.selected]: isSelected })}
        style={style}
        onClick={() => uiStore!.setSelectedElement(element)}
      />
    );
  }
}
