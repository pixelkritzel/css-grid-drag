import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Provider } from 'mobx-react';

import { App } from './App/index';

import { store } from './store';
import { uiModel } from './store/uiStore';

const uiStore = uiModel.create({ shownGrid: store.grids[0] });

import './scss/style.scss';

ReactDom.render(
  <Provider store={store} uiStore={uiStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
