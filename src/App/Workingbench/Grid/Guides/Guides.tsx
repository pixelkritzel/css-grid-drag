import * as React from 'react';
import { observer } from 'mobx-react';

import { Cell } from './Cell';
import { Placement } from './Placement';

import { IGridModel } from 'src/store/gridModel';

@observer
export class Guides extends React.Component<{ gridStore: IGridModel; columns: string[]; rows: string[] }, {}> {
  render() {
    const { gridStore } = this.props;
    return (
      <>
        <Placement gridStore={gridStore} />
        {gridStore.cells.map(cellInstance => (
          <Cell key={cellInstance.id} cellInstance={cellInstance} gridStore={gridStore} />
        ))}
      </>
    );
  }
}
