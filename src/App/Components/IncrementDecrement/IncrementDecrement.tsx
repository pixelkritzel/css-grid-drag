import * as React from 'react';

import { Button } from 'src/App/Components/Button';
import { InputField } from 'src/App/Components/InputField';

import { ReactComponent as AddIcon } from 'src/icons/Add.svg';
import { ReactComponent as RemoveIcon } from 'src/icons/Remove.svg';

import CSS from './IncrementDecrement.module.scss';

type IIncrementDecrementProps = {
  name: string;
  label: React.ReactNode;
  initialValue: number;
  maxValue?: number;
  minValue?: number;
  onValueChange?: (name: string, value: number) => void;
  onIncrement?: (name: string, value: number) => void;
  onDecrement?: (name: string, value: number) => void;
};

export class IncrementDecrement extends React.Component<IIncrementDecrementProps, { value: number }> {
  constructor(props: IIncrementDecrementProps) {
    super(props);
    this.state = {
      value: Number(props.initialValue)
    };
  }

  get isIncrementable() {
    const { maxValue } = this.props;
    return typeof maxValue === 'undefined' || this.state.value < maxValue;
  }

  get isDecrementable() {
    const { minValue } = this.props;
    return typeof minValue === 'undefined' || this.state.value < minValue;
  }

  increment = () => {
    const { name, onValueChange: onValueChangeFromProps = () => undefined, onIncrement = () => undefined } = this.props;
    this.setState(
      prevState => ({
        value: prevState.value + 1
      }),
      () => {
        const { value } = this.state;
        onValueChangeFromProps(name, value);
        onIncrement(name, value);
      }
    );
  };

  decrement = () => {
    const { name, onValueChange: onValueChangeFromProps = () => undefined, onDecrement = () => undefined } = this.props;
    this.setState(
      prevState => ({
        value: prevState.value - 1
      }),
      () => {
        const { value } = this.state;
        onValueChangeFromProps(name, value);
        onDecrement(name, value);
      }
    );
  };

  onValueChange = (name: string, value: string) => {
    const { onValueChange: onValueChangeFromProps = () => undefined } = this.props;
    this.setState({ value: Number(value) }, () => onValueChangeFromProps(name, this.state.value));
  };

  render() {
    const { isIncrementable, isDecrementable, props, state } = this;
    const { name, label } = props;
    const { value } = state;

    return (
      <div className={CSS.wrapper}>
        <InputField
          className={CSS.inputField}
          inline
          type="number"
          label={label}
          name={name}
          value={value.toString()}
        />{' '}
        <Button icon disabled={!isDecrementable} aria-label="Decrement" onClick={this.decrement}>
          <RemoveIcon />
        </Button>
        <Button icon disabled={!isIncrementable} aria-label="Increment" onClick={this.increment}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}
