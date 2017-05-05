import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import history from 'plugins/history';
import store from 'store';

import Main from './modules/main/main.jsx';

require('./uikit/application.scss');
var __svg__= { path: 'uikit/icons/*.svg', name: 'sprite.svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}/>
    </Router>
  </Provider>,
  document.getElementById('react-root')
);