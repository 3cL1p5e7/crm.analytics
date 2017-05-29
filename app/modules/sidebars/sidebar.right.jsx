<style lang="sass">
  @import '~uikit/theme';
  .sidebar-right {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    z-index: 3;

    width: $sidebar-right-width;

    background: $modules-header-color;

    // .close-btn {
    //   position: absolute;
    //   left: 0;
    //   margin: 15px 0 0 0;
    //   cursor: pointer;
    //   &:hover {
    //     svg {
    //       fill: grey;
    //     }
    //   }
    //   svg {
    //     fill: white;
    //     transition: fill .3s ease;
    //   }
    // }

    .sidebar-right-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import { ProfileSign } from 'modules/profile/extensions';


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
      activeForm: store.profile.activeForm
    };
  }
  static mapActions = { ...mainActions }
  render() {
    return (
      <div className={`sidebar-right ${this.props.className || ''}`}>
        { /*<div className="close-btn">
          <svg width="30" height="30" onClick={this.back()}>
            <use xlinkHref="#icon-back"/>
          </svg>
        </div> */}
        <div className="sidebar-right-content">
          { this.props.activeForm ? <ProfileSign/> : null }
        </div>
      </div>
    );
  }
}
SidebarRight.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(SidebarRight);
