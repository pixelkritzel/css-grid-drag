import * as React from 'react';
import * as ReactDom from 'react-dom';

import { inject, Provider } from 'mobx-react';
import jsDownloadFile from 'js-file-download';

import { MenuItem } from './MenuItem';
import { Grid } from 'src/App/Workingbench/Grid';

import CSS from './MenuPanel.module.scss';
import { IStore } from 'src/store';

@inject('store')
export class MenuPanel extends React.Component<{ store?: IStore }> {
  export = () => {
    const exportGridNode = document.createElement('div');
    ReactDom.render(
      <Provider store={this.props.store}>
        <Grid />
      </Provider>,
      exportGridNode
    );
    const html = exportGridNode.outerHTML;
    jsDownloadFile(html, 'grid.html');
  };

  render() {
    return (
      <ul className={CSS.menuPanel}>
        <li>
          <MenuItem label="Export" action={this.export} />
        </li>
      </ul>
    );
  }
}
