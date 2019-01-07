import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Element } from './Element';
import { Guides } from './Guides';

import { IElement } from 'src/store/elementModel';
import { IGridModel } from 'src/store/gridModel';
import { IStore } from 'src/store';

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

  @media (min-width: ${startWidth}px) {
    #grid-${id} {
      display: grid;
      grid-template-rows: ${generateGridDefintionFromNames(rows)};
      grid-template-columns: ${generateGridDefintionFromNames(columns)};
      grid-gap: ${gridGap};
    }
  }

  @media (max-width: ${startWidth - 1}px) {
    #grid-${id} [data-css-grid-drag-cell]{
      display: none;
    }
  }

`;
}

function createElementCss(prev: string, { id, start, width, height, resource, grid, ratio }: IElement) {
  const htmlId = `element-${id}`;
  return (
    prev +
    `
  #${htmlId} {
  grid-column-start: ${start.columnName};
  grid-column-end: span ${width};
  grid-row-start: ${start.rowName};
  grid-row-end: span ${height};
  background-image: url(${resource.url});
  background-size: cover;
  background-repeat: no-repeat;
}

@media (min-width: 320px) and (max-width: ${grid.startWidth - 1}px) {
  #${htmlId} {
    padding-bottom: ${ratio * 100}%;
    margin-bottom: ${grid.gridGap};
  }
}
`
  );
}

@inject('store')
@observer
export class Grid extends React.Component<{ store?: IStore }, {}> {
  render() {
    const { store } = this.props;
    const { columns, elements, gridGap, id, rows, startWidth } = store!.shownGrid;
    const gridStyles = createGridCss({ rows, columns, id, startWidth, gridGap });
    const elementCss = elements.reduce(createElementCss, '');

    return (
      <>
        <style>{gridStyles + elementCss}</style>
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
