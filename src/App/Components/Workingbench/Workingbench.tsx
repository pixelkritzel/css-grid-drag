import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Grid } from './Grid/Grid';

import { IStore } from 'src/store';

type IWorkingbenchProps = {
  store?: IStore;
};

@inject('store')
@observer
export class Workingbench extends React.Component<IWorkingbenchProps, {}> {
  render() {
    const { store } = this.props;
    return (
      <>
        {store!.grids.map((grid, index) => (
          <Grid key={`grid-${index}`} grid={grid} />
        ))}
      </>
    );
  }
}
