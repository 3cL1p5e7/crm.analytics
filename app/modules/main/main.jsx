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
      //transition: filter .3s ease;
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

        .sidebar-fade-enter {
          transform: translate3d(-60%, 0, 0);
          opacity: 0.01;
        }
        .sidebar-fade-leave.sidebar-fade-leave-active {
          transform: translate3d(-60%, 0, 0);
          opacity: 0.01;
        }
      }
      &-right {
        right: 0;

        .sidebar-fade-enter {
          transform: translate3d(60%, 0, 0);
          opacity: 0.01;
        }
        .sidebar-fade-leave.sidebar-fade-leave-active {
          transition: opacity .5s, transform .4s ease;
          transform: translate3d(60%, 0, 0);
          opacity: 0.01;
        }
      }
    }
  }

  .sidebar-fade-enter.sidebar-fade-enter-active {
    transition: opacity .5s, transform .4s ease;
    will-change: transform;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .sidebar-fade-leave {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }


  .to-the-left .modules-fade-enter {
    transform: translate3d(30%, 0, 0);
    opacity: 0.01;
  }
  .to-the-right .modules-fade-enter {
    transform: translate3d(-30%, 0, 0);
    opacity: 0.01;
  }
  
  .modules-fade-enter.modules-fade-enter-active {
    will-change: transform;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .modules-fade-leave {
    will-change: transform;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .to-the-left .modules-fade-leave-active.modules-fade-leave {
    transform: translate3d(-30%, 0, 0);
    opacity: 0;
  }
  .to-the-right .modules-fade-leave-active.modules-fade-leave {
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

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
    this.clearSearch = this.clearSearch.bind(this);
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
  activeComponent() {
    switch (this.props.active) {
      case 'home':
        return <Home key="home" className="booster" />;
      case 'calendar':
        return <Calendar key="calendar" className="booster" />;
      case 'settings':
        return <Settings key="settings" className="booster" />;
    }
  }
  render() {
    const activeComponent = this.activeComponent();
    const leftSidebar = this.props.activeSidebar === 'left' ?
      <SidebarLeft key="left" /> : null;
    const rightSidebar = this.props.activeSidebar === 'right' ?
      <SidebarRight key="right" /> : null;

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
            <CSSTransitionGroup className="modules-container__modules-wrapper"
                                component="div"
                                transitionName="modules-fade"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
              { activeComponent }
            </CSSTransitionGroup>
          </div>
        </div>
        { this.props.activeSidebar ? <div className="substrate" onClick={ this.clearSearch }></div> : null }
        <CSSTransitionGroup className="modules-container__sidebar modules-container__sidebar-left"
                            component="div"
                            transitionName="sidebar-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
          { leftSidebar }
        </CSSTransitionGroup>
        <CSSTransitionGroup className="modules-container__sidebar modules-container__sidebar-right"
                            component="div"
                            transitionName="sidebar-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
          { rightSidebar }
        </CSSTransitionGroup>
        <Profile/>
      </div>
    );
  }
  clearSearch() {
    this.context.router.history.clear();
  }
  componentWillUpdate(nextProps) {
    const modules = this.state.modules;
    if (this.props.active !== nextProps.active)
      this.swipeLeft = modules[this.props.active] < modules[nextProps.active || ''];
  }
}
Main.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Main);
