<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      display: flex;

      height: $header-height;
      background-color: $modules-body-color;

      &--wrapper {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        flex-shrink: 0;

        background: $modules-header-color;
        border-bottom-left-radius: $header-radius;
        
        .header-profile-widget {
          flex-grow: 3;
        }
      }
    }
    
    &__modules {
      display: flex;
      flex-grow: 1;

      &-wrapper {
        position: relative;
        display: flex;
        flex-grow: 1;

        > div {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;

          transition: opacity .5s, transform .4s ease;
        }
      }
    }
  }

  .modules-fade-enter-active {
  }
  .to-the-left .modules-fade-enter-active {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  }
  .to-the-right .modules-fade-enter-active {
    transform: translate3d(-30%, 0, 0);
    opacity: 0;
  }
  
  .modules-fade-enter {
    will-change: transform;
    opacity: 1!important;
    transform: translate3d(0, 0, 0)!important;
    transition: transform .4s, opacity .4s ease;
  }

  .modules-fade-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .modules-fade-leave {
    will-change: transform;
    transition: transform .4s, opacity .4s ease;
  }

  .to-the-left .modules-fade-leave {
    transform: translate3d(-30%, 0, 0);
    opacity: 0;
  }
  .to-the-right .modules-fade-leave {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  }
</style>

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { attachRouterRedux } from 'store/utils';

import { Link, Route } from 'react-router-dom';

import { Home } from 'modules/home/home.jsx';
import { Calendar } from 'modules/calendar/calendar.jsx';
import { Settings } from 'modules/settings/settings.jsx';
import Header from 'modules/header/header.jsx';
import ProfileWidget from 'modules/profile/profile.widget.jsx';
import Transition from 'plugins/transition.jsx';

import * as actions from './actions';

class Main extends Component {
  swipeLeft = false;
  constructor(props) {
    super(props);
    this.state = {
      modules: {
        home: 0,
        calendar: 1,
        settings: 2,
        '': 2
      }
    };
  }
  static mapState(store) {
    return {
      active: store.main.active
    };
  }
  static mapActions = { ...actions }
  static routeHandler() {
    return {
      '/calendar/:comp': (location, match, dispatch) => {
        dispatch(this.mapActions.setActive('calendar'));
      },
      '/calendar': (location, match, dispatch) => {
        dispatch(this.mapActions.setActive('calendar'));
      },
      '/settings': (location, match, dispatch) => {
        dispatch(this.mapActions.setActive('settings'));
      },
      '/': (location, match, dispatch) => {
        dispatch(this.mapActions.setActive('home'));
      }
    };
  }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <div className="modules-container__header--wrapper">
            <ProfileWidget className="header-profile-widget"/>
            <Header active={this.props.active}/>
          </div>
        </div>
        <div className={this.swipeLeft ?
          'modules-container__modules to-the-left' :
          'modules-container__modules to-the-right'}>
          <Transition duration={500}
                      switch={this.props.active}
                      className="modules-container__modules-wrapper"
                      name="modules-fade">
            <Home key="home" case="home" className="booster" />
            <Calendar key="calendar" case="calendar" className="booster"/>
            <Settings key="settings" case="settings" className="booster"/>
          </Transition>
        </div>
      </div>
    );
  }
  componentWillUpdate(nextProps) {
    const modules = this.state.modules;
    if (this.props.active !== nextProps.active)
      this.swipeLeft = modules[this.props.active] < modules[nextProps.active || ''];
  }
}

export default attachRouterRedux(Main);
