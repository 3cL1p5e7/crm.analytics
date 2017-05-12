import createHashHistory from 'history/createHashHistory';
import { matchPath } from 'react-router'
import store from 'store';

class Routes {
  _routes = {}
  _history = null
  constructor(history) {
    this._history = history;
  }
  get history() {
    return this._history;
  }
  get routes() {
    return this._routes;
  }
  addComponentRoutes(component, routes) {
    if (!routes)
      return;
    Object.keys(routes).forEach(key => {
      if (typeof routes[key] !== 'function')
        return;
      this._routes[key] = { 
        ...(this._routes[key] || {}),
        [component]: routes[key]
      };
    });
  }
  dispatch(location) {
    Object.keys(this._routes).forEach(path => {
      const match = matchPath(location.pathname, {
        path,
        exact: true,
        strict: false
      });
      if (!match)
        return;
      Object.keys(this._routes[path]).forEach(component => {
        this._routes[path][component](location, match);
      });
    });
  }
};
const history = createHashHistory();
const routes = new Routes(history);
history.listen(location => routes.dispatch(location));
export default routes;