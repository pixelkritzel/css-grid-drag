import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Cell } from './Cell';
import { Placement } from './Placement';

import { IStore } from 'src/store/store';

@inject('store')
@observer
export class Guides extends React.Component<{ store?: IStore }> {
  render() {
    return (
      <>
        <Placement />
        {this.props.store!.shownGrid.cells.map(cell => (
          <Cell key={cell.id} cell={cell} />
        ))}
      </>
    );
  }
}
