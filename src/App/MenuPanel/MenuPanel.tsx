import * as React from 'react';
import * as ReactDom from 'react-dom';

import { inject, Provider } from 'mobx-react';
import { clone } from 'mobx-state-tree';

import { MenuItem } from './MenuItem';
import { Grid } from 'src/App/Workingbench/Grid';

import CSS from './MenuPanel.module.scss';
import { IStore } from 'src/store';

// tslint:disable-next-line no-var-requires
const fileDownload = require('js-file-download');

@inject('store')
export class MenuPanel extends React.Component<{ store?: IStore }> {
  export = () => {
    const exportGridNode = document.createElement('div');
    const exportStore = clone(this.props.store!);
    exportStore.toggleIsExport();
    ReactDom.render(
      <Provider store={exportStore}>
        <Grid />
      </Provider>,
      exportGridNode
    );
    const html = exportGridNode.outerHTML;
    fileDownload(html, 'grid.html');
  };

  render() {
    return (
      <ul className={CSS.menuPanel}>
        <li>
          <MenuItem label="New" action={this.props.store!.resetStore} />
        </li>
        <li>
          <MenuItem label="Export" action={this.export} />
        </li>
      </ul>
    );
  }
}
