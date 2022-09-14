import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import history from './history';
import '../styles/styles.less';
import store from './store';

Sentry.init({
  dsn: 'https://0a85ce6fefed42a49d44a727614d6b97@sentry.gc.nav.no/25',
  environment: window.location.hostname,
});

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

export { history };
