<style lang="sass">
  @import '~uikit/theme';
  .home {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: $modules-body-color;

    &__options {
      height: 80px;
    }
    &__primary-row {
      flex-grow: 4;
    }
    &__secondary-row {
      flex-grow: 2;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from './actions';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static mapActions = {
    ...actions
  }
  static routeHandler() {
    return {
      routeName: 'home',
      routes: {
        '/dash': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveHome('dash'));
        },
        '/feed': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveHome('feed'));
        }
      }
    };
  }
  render() {
    return (
      <div className={`home ${this.props.className || ''}`}>
        <div className="home__options"></div>
        <div className="home__primary-row"></div>
        <div className="home__secondary-row"></div>
      </div>
    );
  }
}
Home.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Home);
