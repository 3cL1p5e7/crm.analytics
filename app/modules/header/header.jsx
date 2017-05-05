<style lang="sass">
  @import '~uikit/theme';
  .links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;

    transition: all .5s ease;

    &-wrapper {
      position: relative;
      display: flex;
      width: 100px;
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
        cursor: pointer;
        z-index: 2;
        transition: width .4s ease;
      }
    }
  }

  @media (max-width: $phablet) { 
    .links-wrapper.active {
      width: 190px!important;
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
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';
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
  static mapActions = {
    removeActive: mainActions.removeActive,
    setActive: mainActions.setActive
  }
  render() {
    return (
      <div className="links">
          <Transition duration={300}
                      className={'links-wrapper ' + ((this.props.active || '').includes('calendar') ? 'active' : '') }
                      name="items-fade">
            <CalendarWidget key="calendar" path='/calendar' className="widget" />
            <div className="links-wrapper-item" key="item"
                  onClick={this.goToLink(`calendar/${this.props.activeCalendar}`)}>calendare.</div>
          </Transition>
          <Transition duration={300}
                      className={'links-wrapper ' + ((this.props.active || '').includes('settings') ? 'active' : '')}
                      name="items-fade">
            <SettingsWidget key="settings" path='/settings' className="widget" />
            <div className="links-wrapper-item" key="item"
                  onClick={this.goToLink('settings')}>settingse..</div>
          </Transition>
          <div className="links-wrapper">
            <div className="links-wrapper-item" onClick={this.goToLink('')}>exite...</div>
          </div>
        </div>
    );
  }

  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/${module}`);
      if (module.length === 0)
        this.props.removeActive();
      else this.props.setActive(module);
    };
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRedux(Header);
