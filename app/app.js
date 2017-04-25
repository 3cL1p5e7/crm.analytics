import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import { createStore } from 'redux'
import reducer from './reducers'

import Modules from './modules/modules.js';

require('./uikit/application.scss');
const history = createBrowserHistory();
const store = createStore(reducer)

ReactDOM.render(
  <Router history={history}>
    <Route path="/" render={() => 
      <Modules store={store}></Modules>
    }/>
  </Router>,
  document.getElementById('react-root')
);