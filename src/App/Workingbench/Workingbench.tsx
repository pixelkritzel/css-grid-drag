import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Grid } from './Grid/Grid';

@inject('store')
@observer
export class Workingbench extends React.Component {
  render() {
    return (
      <>
        <Grid />
      </>
    );
  }
}
