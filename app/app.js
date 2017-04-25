import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import store from 'store';

import Main from './modules/main.jsx';

require('./uikit/application.scss');
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Route path="/" render={() => 
      <Main store={store}></Main>
    }/>
  </Router>,
  document.getElementById('react-root')
);