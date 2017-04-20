import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import Main from './components/main';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

const history = createBrowserHistory();

const render = (Component) => {
  ReactDOM.render(
    <Router history={history}>
      <AppContainer>
        
          <Route path="/" component={Component} />
        
      </AppContainer>
    </Router>,
    document.getElementById('react-root')
  );
};

render(Main);

/*render(
  <AppContainer>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Main} />
    </Router>
  </AppContainer>,
  document.getElementById('react-root')
);*/

if (module.hot) {
  module.hot.accept('./components/main', () => {
    render(Main)
  });
}

// render(
//   < RootContainer />,
//   document.getElementById('react-root')
// );
// if (module.hot)
//   module.hot.accept('./components/main.js', () => {
//     const NextRootContainer = require('./components/main.js').default;
//     render(< NextRootContainer />, document.getElementById('react-root'));
//   });