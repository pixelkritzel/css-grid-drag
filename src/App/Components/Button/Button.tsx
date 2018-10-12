import * as React from 'react';
import * as cx from 'classnames';

import CSS from './Button.module.scss';

type IButtonProps = {
  icon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export class Button extends React.Component<IButtonProps> {
  render() {
    const { icon, onClick, ...otherProps } = this.props;
    return (
      <button className={cx(CSS.button, { [CSS.icon]: icon })} type="button" onClick={onClick} {...otherProps}>
        {this.props.children}
      </button>
    );
  }
}
