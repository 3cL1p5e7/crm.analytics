<style lang="sass">
  @import '~uikit/theme';
  .sidebar-left {
    display: flex;
    justify-content: center;
    flex-grow: 1;

    background-color: yellow;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';

import * as mainActions from 'modules/main/actions';

class SidebarLeft extends Component {
  constructor(props) {
    super(props);
  }
  static routeHandler() {
    return {
      routeParam: { side: 'left' },
      handler: (location, match, dispatch) => {
        dispatch(this.mapActions.setActiveSidebar(match.value));
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
      <div className={`sidebar-left ${this.props.className || ''}`}>
        left<br/>
        left<br/>
        left<br/>
        left<br/>
      </div>
    );
  }
}
SidebarLeft.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(SidebarLeft);
