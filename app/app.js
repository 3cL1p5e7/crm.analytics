import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import routes from 'plugins/history';
import store from 'store';

import locatization from 'plugins/localization';

import Main from './modules/main/main.jsx';

require('./uikit/application.scss');
var __svg__= { path: 'uikit/icons/*.svg', name: 'sprite.svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

Component.prototype.localization = locatization;

ReactDOM.render(
  <Provider store={store}>
    <Router history={routes.history}>
        <Route path="/" render={() => (
          <div>
            { 
              routes.history.location.pathname === '/' ? <Redirect to="/home/dash" /> : null
            }
            <Main/>
          </div>
        )}/>
        
    </Router>
  </Provider>,
  document.getElementById('react-root')
);
