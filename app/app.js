import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import createHashHistory from 'history/createHashHistory'
import store from 'store';

import Main from './modules/main/main.jsx';

require('./uikit/application.scss');
var __svg__= { path: 'uikit/icons/*.svg', name: '[hash].svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
const history = createHashHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}/>
    </Router>
  </Provider>,
  document.getElementById('react-root')
);