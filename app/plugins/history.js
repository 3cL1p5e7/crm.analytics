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
  buildPath(root, subpath) {
    if (root)
      return `/${root + subpath}`;
    return subpath;
  }
  addComponentRoutes(component, router) {
    if (!router || !router.routes)
      return;
    Object.keys(router.routes).forEach(key => {
      if (typeof router.routes[key] !== 'function')
        return;
      const buildedPath = this.buildPath(router.routeName, key);
      this._routes[buildedPath] = { 
        ...(this._routes[buildedPath] || {}),
        [router.routeName]: router.routes[key]
      };
      this.dispatchOne(key, router.routeName, router.routes[key]);
    });
  }
  dispatchOne(path, routeName, handler) {
    const _path = this.buildPath(routeName, path);
    const match = matchPath(this._history.location.pathname, {
      path: _path,
      // exact: true,
      strict: false
    });
    if (!match)
      return;
    handler(this._history.location, match, store.dispatch);
  }
  dispatch(location) {
    let matched = false;
    Object.keys(this._routes).forEach(path => {
      const match = matchPath(location.pathname, {
        path: path,
        // exact: true,
        strict: false
      });
      if (!match)
        return;
      matched = true;
      Object.keys(this._routes[path]).forEach(routeName => {
        this._routes[path][routeName](location, match, store.dispatch);
      });
    });
    if (!matched) this._history.goBack();
  }
};
const history = createHashHistory();
const routes = new Routes(history);
history.listen(location => routes.dispatch(location));
export default routes;
