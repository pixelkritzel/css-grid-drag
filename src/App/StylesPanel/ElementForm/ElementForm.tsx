import * as React from 'react';
import * as cx from 'classnames';

import CancelIcon from '@material-ui/icons/Cancel';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Button } from 'src/App/Components/Button';

import { IElement } from 'src/store/elementModel';
import { IGridModel } from 'src/store/gridModel';

import CSS from './ElementForm.module.scss';
import { IUiStore } from 'src/store/uiStore';
import { inject, observer } from 'mobx-react';

type IElementFormProps = {
  element: IElement;
  gridStore: IGridModel;
  index: number;
  open?: boolean;
  uiStore?: IUiStore;
};

@inject('uiStore')
@observer
export class ElementForm extends React.Component<IElementFormProps> {
  render() {
    const { element, gridStore, index, open, uiStore } = this.props;
    return (
      <div className={CSS.elementForm}>
        <Button style="text" onClick={() => uiStore!.setSelectedElement(element)}>
          <strong className={CSS.title}>
            {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            Element {index}
          </strong>
        </Button>
        <div className={cx(CSS.elementFormBody, { [CSS.closed]: !open })}>
          <img className={CSS.img} src={element.resource.url} />
          <Button fullWidth style="danger" onClick={() => gridStore.removeElement(element)}>
            <CancelIcon fontSize="inherit" /> Remove
          </Button>
        </div>
      </div>
    );
  }
}
