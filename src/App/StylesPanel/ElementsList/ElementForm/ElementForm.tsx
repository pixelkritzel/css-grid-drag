import * as React from 'react';
import * as cx from 'classnames';
import { inject, observer } from 'mobx-react';

import CancelIcon from '@material-ui/icons/Cancel';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Button } from 'src/App/Components/Button';

import { IElement } from 'src/store/elementModel';

import CSS from './ElementForm.module.scss';
import { IStore } from 'src/store/store';

type IElementFormProps = {
  element: IElement;
  index: number;
  open?: boolean;
  store?: IStore;
};

@inject('store')
@observer
export class ElementForm extends React.Component<IElementFormProps> {
  removeElement = () => {
    const { element, store } = this.props;
    store!.shownGrid.removeElement(element);
  };

  render() {
    const { element, index, open, store } = this.props;
    return (
      <div className={CSS.elementForm}>
        <Button variant="text" onClick={() => store!.setSelectedElement(element)}>
          <strong className={CSS.title}>
            {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            Element {index}
          </strong>
        </Button>
        <div className={cx(CSS.elementFormBody, { [CSS.closed]: !open })}>
          <img className={CSS.img} src={element.resource.url} />
          <Button fullWidth variant="danger" onClick={this.removeElement}>
            <CancelIcon fontSize="inherit" /> Remove
          </Button>
        </div>
      </div>
    );
  }
}
