import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Provider } from 'mobx-react';

import { App } from './App/index';

import { dataStore } from './store/dataStore';
import { storeModel } from './store';

const store = storeModel.create({ data: dataStore, shownMediaQuery: dataStore.grid.mediaQueries[0] });

import './scss/style.scss';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
