import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import Modules from './modules/modules.js';

require('./uikit/application.scss');
const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
    
    <Route exact path="/" render={() => 
      <div>
        <Redirect to="/#/" />
        <Route path="/" component={Modules} />
      </div>
    }/>
  </Router>,
  document.getElementById('react-root')
);