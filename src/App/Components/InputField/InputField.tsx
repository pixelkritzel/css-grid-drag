import * as React from 'react';
import * as uuid from 'uuid/v4';
import * as cx from 'classnames';

import CSS from './InputField.module.scss';

type IInputFieldProps = {
  className?: string;
  inline?: boolean;
  name: string;
  label: React.ReactNode;
  value: string;
  type?: string;
  onValueChange?: (name: string, value: string) => void;
};

export class InputField extends React.Component<IInputFieldProps, {}> {
  uuid: string;

  constructor(props: IInputFieldProps) {
    super(props);
    this.uuid = uuid();
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange(currentTarget.name, currentTarget.value);
    }
  };

  render() {
    const { children, className, inline, label, name, value, type = 'text', ...otherProps } = this.props;
    delete otherProps.onValueChange;
    return (
      <div className={cx(className, CSS.inputField, { [CSS.inline]: inline })}>
        <label htmlFor={this.uuid}>{label}</label>
        <input value={value} name={name} id={this.uuid} type={type} onChange={this.onChange} {...otherProps} />
        {children}
      </div>
    );
  }
}
