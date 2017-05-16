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

  .items-fade-enter-active {
    opacity: 0;
  }
  .items-fade-enter {
    opacity: 1;
    transition: opacity .2s ease;
  }

  .items-fade-leave-active {
    opacity: 1;
  }
  .items-fade-leave {
    opacity: 0!important;
    transition: opacity .2s ease;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';
import { HomeWidget } from 'modules/home/home.jsx';
import { CalendarWidget } from 'modules/calendar/calendar.jsx';
import { SettingsWidget } from 'modules/settings/settings.jsx';

import * as mainActions from 'modules/main/actions';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  static mapState(store) {
    return {
      activeCalendar: store.calendar.active
    };
  }
  render() {
    return (
      <div className="links">
          <Transition duration={300}
                      switch={this.props.active}
                      className={'links-wrapper ' + ((this.props.active || '').includes('home') ? 'active' : '')}
                      name="items-fade"
                      onClick={this.goToLink(``)}>
            <HomeWidget key="home" case="home" className="widget" />
            <div className="links-wrapper-item" key="item">home</div>
          </Transition>
          <Transition duration={300}
                      switch={this.props.active}
                      className={'links-wrapper ' + ((this.props.active || '').includes('calendar') ? 'active' : '') }
                      name="items-fade"
                      onClick={this.goToLink(`calendar/${this.props.activeCalendar}`)}>
            <CalendarWidget key="calendar" case="calendar" className="widget" />
            <div className="links-wrapper-item" key="item">calendar</div>
          </Transition>
          <Transition duration={300}
                      switch={this.props.active}
                      className={'links-wrapper ' + ((this.props.active || '').includes('settings') ? 'active' : '')}
                      name="items-fade"
                      onClick={this.goToLink('settings')}>
            <SettingsWidget key="settings" case="settings" className="widget" />
            <div className="links-wrapper-item" key="item">settings</div>
          </Transition>
        </div>
    );
  }

  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/${module}`);
    };
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Header);
