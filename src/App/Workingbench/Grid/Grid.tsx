import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Element } from './Element';
import { Guides } from './Guides';

import { IStore } from 'src/store';
import { IGridModel } from 'src/store/gridModel';

function generateGridDefintionFromNames(names: string[]) {
  return names.reduce((prev, name, index) => `${prev} [${name}] ${index < names.length - 1 ? ' 1fr' : ''}`, '');
}

function createGridCss({
  columns,
  gridGap,
  id,
  rows,
  startWidth
}: {
  columns: IGridModel['columns'];
  gridGap: IGridModel['gridGap'];
  id: IGridModel['id'];
  rows: IGridModel['rows'];
  startWidth: IGridModel['startWidth'];
}) {
  return `
  @media (min-width: ${startWidth}px) {
    #grid-${id} {
      display: grid;
      grid-template-rows: ${generateGridDefintionFromNames(rows)};
      grid-template-columns: ${generateGridDefintionFromNames(columns)};
      grid-gap: ${gridGap};
    }
  }
`;
}

@inject('store')
@observer
export class Grid extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    const { columns, elements, gridGap, id, rows, startWidth } = store!.shownGrid;
    const gridStyles = createGridCss({ rows, columns, id, startWidth, gridGap });

    return (
      <>
        <style>{gridStyles}</style>
        <div id={`grid-${id}`}>
          <Guides />
          {elements.map(element => (
            <Element key={`element-${element.id}`} element={element} />
          ))}
        </div>
      </>
    );
  }
}
