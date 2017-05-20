<style lang="sass">
  @import '~uikit/theme';

  .substrate {
    position: fixed!important;

    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    z-index: 2!important;
  }

  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &--main {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: filter .3s ease;
    }
    & > div {
      position: relative;
      z-index: 1;
    }

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
      }
    }

    &__subheader {
      display: flex;
      background-color: $modules-body-color;
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

    &__sidebar {
      position: absolute!important;
      top: 0;
      bottom: 0;
      z-index: 2!important;

      display: flex;

      &-left {
        left: 0;

        .sidebar-fade-enter-active {
          transform: translate3d(-60%, 0, 0);
          opacity: 0;
        }
        .sidebar-fade-leave {
          transform: translate3d(-60%, 0, 0);
          opacity: 0;
        }
      }
      &-right {
        right: 0;

        .sidebar-fade-enter-active {
          transform: translate3d(60%, 0, 0);
          opacity: 0;
        }
        .sidebar-fade-leave {
          transform: translate3d(60%, 0, 0);
          opacity: 0;
        }
      }

    }
  }

  .sidebar-fade-enter {
    will-change: transform;
    opacity: 1!important;
    transform: translate3d(0, 0, 0)!important;
    transition: transform .4s, opacity .4s ease;
  }
  .sidebar-fade-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .sidebar-fade-leave {
    will-change: transform;
    transition: transform .4s, opacity .4s ease;
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

import Header from './header.jsx';
import Subheader from './header.sub.jsx';

import Home from 'modules/home/home.jsx';
import Calendar from 'modules/calendar/calendar.jsx';
import Settings from 'modules/settings/settings.jsx';

import Profile from 'modules/profile/profile.jsx';

import SidebarLeft from 'modules/sidebars/sidebar.left.jsx';
import SidebarRight from 'modules/sidebars/sidebar.right.jsx';

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
      active: store.main.active,
      activeSidebar: store.main.activeSidebar,
      blured: Boolean(store.main.activeSidebar)
    };
  }
  static mapActions = { ...actions }
  static routeHandler() {
    return {
      routeName: '',
      routes: {
        '/home': (location, match, dispatch) => {
          dispatch(this.mapActions.setActive('home'));
        },
        '/calendar': (location, match, dispatch, only) => {
          dispatch(this.mapActions.setActive('calendar'));
        },
        '/settings': (location, match, dispatch) => {
          dispatch(this.mapActions.setActive('settings'));
        }
      },
      deactivator: (dispatch) => {
      }
    };
  }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container--main"
             style={ {'filter': this.props.blured ? 'blur(5px)' : 'none'} }>
          <div className="modules-container__header">
            <div className="modules-container__header--wrapper">
              <Header active={this.props.active}/>
            </div>
          </div>
          <div className="modules-container__subheader">
            <Subheader active={this.props.active} />
          </div>
          <div className={`modules-container__modules ${this.swipeLeft ? 'to-the-left' : 'to-the-right'}`}>
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
        { this.props.activeSidebar ? <div className="substrate"></div> : null }
        <Transition duration={500}
                    switch={this.props.activeSidebar}
                    className="modules-container__sidebar modules-container__sidebar-left"
                    name="sidebar-fade">
          <SidebarLeft key="left" case="left"/>
        </Transition>
        <Transition duration={500}
                    switch={this.props.activeSidebar}
                    className="modules-container__sidebar modules-container__sidebar-right"
                    name="sidebar-fade">
          <SidebarRight key="right" case="right"/>
        </Transition>
        <Profile/>
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
