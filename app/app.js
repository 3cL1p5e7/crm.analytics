import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import Main from './components/main';

const history = createBrowserHistory();

const render = (Component) => {
  ReactDOM.render(
    <Router history={history}>
      <Route path="/" component={Component} />
    </Router>,
    document.getElementById('react-root')
  );
};

render(Main);