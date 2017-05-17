import { connect } from 'react-redux';
import routes from 'plugins/history';
import { withRouter } from 'react-router';

export const attachRouterRedux = (targetClass) => {
  if (typeof targetClass.routeHandler === 'function')
    routes.addComponentRoutes(targetClass.name, targetClass.routeHandler());
  return withRouter(connect(targetClass.mapState, targetClass.mapActions)(targetClass));
};

export const attachReducers = (reducers, defaultState) => {
  return (state = defaultState, action) => {
    if (reducers[action.type])
      return { ...state, ...reducers[action.type](state, action) };
    return state;
  }
};

export const omit = (obj, omitKey) => {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}