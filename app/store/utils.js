import { connect } from 'react-redux';
import routes from 'plugins/history';
import { withRouter } from 'react-router';

export const attachRouterRedux = (targetClass) => {
  if (typeof targetClass.routeHandler === 'function')
    routes.addComponentRoutes(targetClass.name, targetClass.routeHandler());
  console.log(targetClass.name);
  return withRouter(connect(targetClass.mapState, targetClass.mapActions)(targetClass));
};