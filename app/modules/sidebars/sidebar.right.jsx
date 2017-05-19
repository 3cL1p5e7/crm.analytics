<style lang="sass">
  @import '~uikit/theme';
  .sidebar-right {
    display: flex;
    justify-content: center;
    flex-grow: 1;

    background-color: red;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';

import * as mainActions from 'modules/main/actions';

class SidebarRight extends Component {
  constructor(props) {
    super(props);
  }
  static routeHandler() {
    return {
      routeParam: 'side',
      handlers: {
        right: (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveSidebar(match.value));
        }
      },
      deactivator: (dispatch) => {
        dispatch(this.mapActions.setActiveSidebar(null));
      }
    };
  }
  static mapState(store) {
    return {
    };
  }
  static mapActions = { ...mainActions }
  render() {
    return (
      <div className={`sidebar-right ${this.props.className || ''}`}>
        left<br/>
        left<br/>
        left<br/>
        left<br/>
      </div>
    );
  }
}
SidebarRight.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(SidebarRight);
