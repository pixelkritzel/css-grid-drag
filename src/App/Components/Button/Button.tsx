import * as React from 'react';
import * as cx from 'classnames';

import CSS from './Button.module.scss';

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  tag?: 'button' | 'label';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'danger' | 'text';
}

export class Button extends React.Component<IButtonProps> {
  render() {
    const { className = '', tag: Tag = 'button', fullWidth, icon, onClick, variant, ...otherProps } = this.props;
    return (
      <Tag
        className={cx(
          CSS.button,
          { [CSS.fullWidth]: fullWidth, [CSS.icon]: icon, [CSS[`variant-${variant}`]]: variant },
          className
        )}
        type="button"
        onClick={onClick}
        {...otherProps}
      >
        {this.props.children}
      </Tag>
    );
  }
}
