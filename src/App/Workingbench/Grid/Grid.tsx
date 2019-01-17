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
  cellHeight,
  cellWidth,
  columns,
  gridGap,
  id,
  rows,
  startWidth
}: {
  cellHeight: IGridModel['cellHeight'];
  cellWidth: IGridModel['cellWidth'];
  columns: IGridModel['columns'];
  gridGap: IGridModel['gridGap'];
  id: IGridModel['id'];
  rows: IGridModel['rows'];
  startWidth: IGridModel['startWidth'];
}) {
  return `
  #grid-${id} [data-css-grid-drag-cell]{
    display: none;
  }

  @supports (display: grid) {
    @media (min-width: ${startWidth}px) {
      #grid-${id} [data-css-grid-drag-cell] {
        display: block;
        padding-bottom: ${(cellHeight / cellWidth) * 100}%;
      }

      #grid-${id} {
        display: grid;
        grid-template-rows: ${generateGridDefintionFromNames(rows)};
        grid-template-columns: ${generateGridDefintionFromNames(columns)};
        grid-gap: ${gridGap};
      }
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
  padding-bottom: ${ratio * 100}%;
  margin-bottom: ${grid.gridGap};
  background-image: url(${resource.url});
  background-size: cover;
  background-repeat: no-repeat;
}


@supports (display: grid) {
  @media (min-width: ${grid.startWidth}px) {
    #${htmlId} {
      grid-column-start: ${start.columnName};
      grid-column-end: span ${width};
      grid-row-start: ${start.rowName};
      grid-row-end: span ${height};
    }
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
    const { elements, id } = store!.shownGrid;
    const gridStyles = createGridCss(store!.shownGrid);
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
