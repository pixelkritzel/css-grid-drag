import * as React from 'react';

import { Button } from 'src/App/Components/Button';

type IMenuItemProps = {
  action: () => any;
  label: string;
};

export class MenuItem extends React.Component<IMenuItemProps> {
  render() {
    const { action, label } = this.props;
    return <Button onClick={action}>{label}</Button>;
  }
}
