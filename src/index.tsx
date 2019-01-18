import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Provider } from 'mobx-react';

import { App } from './App/index';

import { storeModel } from './store';

import './scss/style.scss';

const store = storeModel.create({} as any);

const { chrome } = window as any;

if (chrome) {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
} else {
  document.write(
    "Sadly the CSS Grid Post editor works just with chromium browsers (Chrome, Opera, Brave ...) because of weird drag'n'drop event handlers and this is just a side project. Sorry. 😞"
  );
}
