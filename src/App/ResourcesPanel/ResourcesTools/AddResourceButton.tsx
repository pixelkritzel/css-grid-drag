import * as React from 'react';

import AddIcon from '@material-ui/icons/Add';

import { Button } from 'src/App/Components/Button';

export class AddResourceButton extends React.Component {
  render() {
    return (
      <Button icon onClick={_ => alert('adding something')}>
        <AddIcon />
      </Button>
    );
  }
}
