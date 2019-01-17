import * as React from 'react';

import { Button } from 'src/App/Components/Button';

type IMenuItemProps = {
  action: () => any;
  label: string;
};

export class MenuItem extends React.Component<IMenuItemProps> {
  render() {
    const { action, label } = this.props;
    return (
      <Button variant="text" onClick={action}>
        {label}
      </Button>
    );
  }
}
