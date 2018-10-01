import * as React from 'react';
import { inject } from 'mobx-react';

import { Grid } from './Grid/Grid';

import { IStore } from 'src/ts/store';

type IWorkingbenchProps = {
  store?: IStore;
};

@inject('store')
export class Workingbench extends React.Component<IWorkingbenchProps, {}> {
  render() {
    console.log(JSON.stringify(this.props, undefined, 2));

    const { store } = this.props;
    return (
      <>
        {store!.grids.map(grid => (
          <Grid grid={grid} />
        ))}
      </>
    );
  }
}
