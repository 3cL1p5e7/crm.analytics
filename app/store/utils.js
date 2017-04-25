import { connect } from 'react-redux';
import { withRouter } from 'react-router';
export const attachRedux = (targetClass) => {
  return withRouter(connect(targetClass.mapState, targetClass.mapActions)(targetClass));
};