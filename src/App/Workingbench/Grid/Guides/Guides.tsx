import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Cell } from './Cell';
import { Placement } from './Placement';

import { IStore } from 'src/store/store';

@inject('store')
@observer
export class Guides extends React.Component<{ store?: IStore }> {
  render() {
    const { shownGrid: shownMediaQuery } = this.props.store!;
    return (
      <>
        <Placement />
        {shownMediaQuery.cells.map(cellInstance => (
          <Cell key={cellInstance.id} cellInstance={cellInstance} />
        ))}
      </>
    );
  }
}
