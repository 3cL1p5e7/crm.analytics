<style lang="sass">
  @import '~uikit/theme';
  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 1;

    transition: all .5s ease;

    &-wrapper {
      position: relative;
      display: flex;
      width: 100px;
      cursor: pointer;
      transition: width .4s ease;

      &.active {
        width: 450px;
      }
      > .widget {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        flex-grow: 1;
      }
      &-item {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;

        color: $modules-header-text-color;
        margin: 0 10px 0 10px;

        z-index: 2;
        transition: width .4s ease;
      }
    }
  }

  @media (max-width: $phablet) { 
    .links-wrapper.active {
      width: 150px!important;
    }
    .links-wrapper {
      width: 65px;
    }
  }

  .items-fade-enter {
    opacity: 0;
  }
  .items-fade-enter.items-fade-enter-active {
    opacity: 1;
    transition: opacity .2s ease;
  }

  .items-fade-leave {
    opacity: 1;
  }
  .items-fade-leave.items-fade-leave-active {
    opacity: 0;
    transition: opacity .2s ease;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { HomeWidget } from 'modules/home/extensions';
import { CalendarWidget } from 'modules/calendar/extensions';
import { SettingsWidget } from 'modules/settings/extensions';

import { ProfileWidget } from 'modules/profile/extensions';

import * as mainActions from 'modules/main/actions';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  static mapState(store) {
    return {
      activeCalendar: store.calendar.active,
      activeHome: store.home.active
    };
  }
  render() {
    const home = this.props.active === 'home' ?
      <HomeWidget key="home" className="widget" /> :
      <div className="links-wrapper-item" key="item">home</div>;
    const calendar = this.props.active === 'calendar' ?
      <CalendarWidget key="calendar" className="widget" /> :
      <div className="links-wrapper-item" key="item">calendar</div>;
    const settings = this.props.active === 'settings' ?
      <SettingsWidget key="settings" className="widget" /> :
      <div className="links-wrapper-item" key="item">settings</div>;
    return (
      <div className="links">
        <CSSTransitionGroup className={'links-wrapper ' + ((this.props.active || '').includes('home') ? 'active' : '')}
                            component="div"
                            transitionName="items-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                            onClick={this.goToModule(`home/${this.props.activeHome}`)}>
          {home}
        </CSSTransitionGroup>
        <CSSTransitionGroup className={'links-wrapper ' + ((this.props.active || '').includes('calendar') ? 'active' : '')}
                            component="div"
                            transitionName="items-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                            onClick={this.goToModule(`calendar/${this.props.activeHome}`)}>
          {calendar}
        </CSSTransitionGroup>
        <CSSTransitionGroup className={'links-wrapper ' + ((this.props.active || '').includes('settings') ? 'active' : '')}
                            component="div"
                            transitionName="items-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                            onClick={this.goToModule(`settings/${this.props.activeHome}`)}>
          {settings}
        </CSSTransitionGroup>
        <div className="links-wrapper">
          <ProfileWidget className="links-wrapper-item widget" />
        </div>
      </div>
    );
  }

  goToModule(module, search) {
    return () => {
      if (module === this.props.active && !search)
        return;
      this.context.router.history.push({
        pathname: `/${module}`,
        search: search ? `?${search}` : ''
      });
    };
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Header);
