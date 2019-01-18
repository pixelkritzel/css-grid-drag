import * as React from 'react';
import * as ReactDom from 'react-dom';

import { inject, Provider, observer } from 'mobx-react';
import { clone, getSnapshot } from 'mobx-state-tree';

import { MenuItem } from './MenuItem';
import { Grid } from 'src/App/Workingbench/Grid';

import CSS from './MenuPanel.module.scss';
import { IStore } from 'src/store';
import { IDataSnaphotIn } from 'src/store/dataStore';

// tslint:disable-next-line no-var-requires
const fileDownload = require('js-file-download');

@inject('store')
@observer
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

  load = (event: React.ChangeEvent<HTMLInputElement>) => {
    const store = this.props.store!;
    const { target } = event;
    const files = target.files; // FileList object
    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          try {
            const dataSnapshot = JSON.parse(reader.result) as IDataSnaphotIn;
            store.load(dataSnapshot);
          } catch (e) {
            // tslint:disable-next-line no-console
            console.log(e);
            alert('This file was not valid. :-/');
          }
        }
        target.value = '';
      };
      try {
        reader.readAsText(files[0]);
      } catch (e) {
        // tslint:disable-next-line no-console
        console.log(e);
      }
    }
  };

  saveLocally = () => {
    const storeSnapShot = getSnapshot(this.props.store!.data);
    fileDownload(JSON.stringify(storeSnapShot, undefined, 2), 'grid.json');
  };

  render() {
    return (
      <ul className={CSS.menuPanel}>
        <li>
          <MenuItem action={this.props.store!.resetStore}>New</MenuItem>
        </li>
        <li>
          <MenuItem tag="label">
            Load
            <input className={CSS.visuallyHidden} type="file" onChange={this.load} />
          </MenuItem>
        </li>
        <li>
          <MenuItem action={this.saveLocally}>Save locally</MenuItem>
        </li>
        <li>
          <MenuItem action={this.export}>Export HTML</MenuItem>
        </li>
      </ul>
    );
  }
}
