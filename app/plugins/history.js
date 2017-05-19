import createHashHistory from 'history/createHashHistory';
import { matchPath } from 'react-router'
import { getParamByName } from 'store/utils'
import store from 'store';

class Routes {
  _routes = {}
  _params = {}
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
  get params() {
    return this._params;
  }
  _buildPath(root, subpath) {
    if (root)
      return `/${root + subpath}`;
    return subpath;
  }
  _dispatchParam(key, value, handlers) {
    const location = this._history.location;
    const match = {
      key,
      value,
      result: getParamByName(key,
        location.pathname + location.search)
    };
    match.isMatch = match.result === value;
    if (match.isMatch)
      handlers.forEach(handler => {
        handler(this._history.location, match, store.dispatch);
      });
  }
  _dispatchRoute(path, routeName, handlers) {
    const _path = this._buildPath(routeName, path);
    const match = matchPath(this._history.location.pathname, {
      path: _path,
      // exact: true,
      strict: false
    });
    if (!match)
      return;
    handlers.forEach(handler => {
      handler(this._history.location, match, store.dispatch);
    });
  }

  addComponentRoutes(component, router) {
    console.warn(router.routeName, router.routeParam);
    if (!router)
      return;
    if (router.routeParam && typeof router.handler === 'function') {
      Object.keys(router.routeParam).forEach(key => {
        const value = router.routeParam[key];
        const existParams = (this._params[key] || {});
        this._params[key] = {
          ...existParams,
          [value]: [
            ...(existParams[value] || []),
            router.handler
          ]
        };
        this._dispatchParam(key, value, [router.handler]);
      });
    }
    if (!router.routes)
      return;
    Object.keys(router.routes).forEach(key => {
      if (typeof router.routes[key] !== 'function')
        return;
      const handler = router.routes[key];
      const buildedPath = this._buildPath(router.routeName, key);
      this._routes[buildedPath] = { 
        ...(this._routes[buildedPath] || {}),
        [router.routeName]: handler
      };
      this._dispatchRoute(key, router.routeName, [handler]);
    });
  }
  dispatch(location) {
    let matched = false;
    Object.keys(this._params).forEach(key => {
      Object.keys(this._params[key]).forEach(value => {
        this._dispatchParam(key, value, this._params[key][value]);
      });
    });
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
        const handler = this._routes[path][routeName];
        handler(location, match, store.dispatch);
      });
    });
    if (!matched) this._history.goBack();
  }
};
const history = createHashHistory();
const routes = new Routes(history);
history.listen(location => routes.dispatch(location));
export default routes;
