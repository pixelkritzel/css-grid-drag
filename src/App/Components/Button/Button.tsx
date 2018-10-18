import * as React from 'react';
import * as cx from 'classnames';

import CSS from './Button.module.scss';

type IButtonProps = {
  fullWidth?: boolean;
  icon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: 'danger';
};

export class Button extends React.Component<IButtonProps> {
  render() {
    const { fullWidth, icon, onClick, style } = this.props;
    return (
      <button
        className={cx(CSS.button, { [CSS.fullWidth]: fullWidth, [CSS.icon]: icon, [CSS[`style-${style}`]]: style })}
        type="button"
        onClick={onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
