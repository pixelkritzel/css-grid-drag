import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as cx from 'classnames';

import { Handle } from 'src/App/Workingbench/Grid/Element/Handle';

import { IElement } from 'src/store/elementModel';
import { IStore } from 'src/store/store';

import CSS from './Element.module.scss';

@inject('store')
@observer
export class Element extends React.Component<{ element: IElement; store?: IStore }, {}> {
  isGlobalOnClickBound = false;

  bindKeyDown = () => {
    const { element, store } = this.props;
    if (store!.selectedElement === element) {
      return this.onKeyDown;
    }
    return undefined;
  };

  onClick = (event: PointerEvent) => {
    const target = event.target as HTMLDivElement;
    if (!target.matches('.element')) {
      this.props.store!.unsetSelectedElement();
    }
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      this.props.store!.unsetSelectedElement();
    }
  };

  componentDidUpdate() {
    const { element, store } = this.props;
    if (store!.selectedElement === element && !this.isGlobalOnClickBound) {
      document.addEventListener('click', this.onClick);
      this.isGlobalOnClickBound = true;
    }
    if (store!.selectedElement !== element && this.isGlobalOnClickBound) {
      document.removeEventListener('click', this.onClick);
      this.isGlobalOnClickBound = false;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    this.isGlobalOnClickBound = false;
  }

  render() {
    const { element, store } = this.props;
    const { id } = element;
    const { isExport, selectedElement } = store!;
    const isSelected = selectedElement === element;
    return (
      <>
        <div
          className={isExport ? undefined : cx(CSS.element, { [CSS.selected]: isSelected })}
          id={`element-${id}`}
          onClick={() => store!.setSelectedElement(element)}
          onKeyDown={this.bindKeyDown()}
          tabIndex={isExport ? undefined : 0}
          data-css-grid-drag-element
        >
          {isSelected && (
            <>
              <Handle movementType="moveTop" />
              <Handle movementType="moveRight" />
              <Handle movementType="moveBottom" />
              <Handle movementType="moveLeft" />
            </>
          )}
        </div>
      </>
    );
  }
}
