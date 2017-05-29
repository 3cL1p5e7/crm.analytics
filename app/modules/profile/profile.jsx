<style lang="sass">
  @import '~uikit/theme';
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from './actions';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  static mapActions = { ...actions }
  static mapState = (store) => {
    return {
      logged: store.profile.logged
    };
  }
  static routeHandler() {
    return {
      routeParam: 'sign',
      handlers: {
        'in': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveProfileForm(match.value));
        },
        'up': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveProfileForm(match.value));
        },
        'forgot': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveProfileForm(match.value));
        }
      },
      deactivator: (dispatch) => {
        dispatch(this.mapActions.setActiveProfileForm(null));
      }
    };
  }
  render() {
    return null;
  }
}
Profile.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Profile);
