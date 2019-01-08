import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';

import { App } from './App/index';

import { dataStore } from './store/dataStore';
import { storeModel } from './store';

import './scss/style.scss';

const store = storeModel.create({ data: dataStore, shownGrid: dataStore.grids[0] });

if (process.env.NODE_ENV === 'development') {
  onSnapshot(dataStore, console.log);
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
