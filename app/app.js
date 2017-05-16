import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import routes from 'plugins/history';
import store from 'store';

import Main from './modules/main/main.jsx';

require('./uikit/application.scss');
var __svg__= { path: 'uikit/icons/*.svg', name: 'sprite.svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

ReactDOM.render(
  <Provider store={store}>
    <Router history={routes.history}>
      <div>
        <Route path="/" render={() => (
          <Redirect to="/home" />
        )}/>
        <Route path="/home" component={Main}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-root')
);