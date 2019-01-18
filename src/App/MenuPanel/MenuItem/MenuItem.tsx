import * as React from 'react';

import { Button, IButtonProps } from 'src/App/Components/Button';

interface IMenuItemProps extends IButtonProps {
  action?: () => any;
}

export class MenuItem extends React.Component<IMenuItemProps> {
  static defaultProps = {
    action: () => undefined
  };

  render() {
    const { action, children, ...otherProps } = this.props;
    return (
      <Button variant="text" onClick={action} {...otherProps}>
        {children}
      </Button>
    );
  }
}
