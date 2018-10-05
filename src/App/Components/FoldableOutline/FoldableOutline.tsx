import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { GridForm } from 'src/App/Components/GridForm';

import { IStore } from 'src/store';

@inject('store')
@observer
export class FoldableOutline extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    return (
      <>
        {store!.grids.map(grid => (
          <GridForm gridStore={grid} />
        ))}
      </>
    );
  }
}
