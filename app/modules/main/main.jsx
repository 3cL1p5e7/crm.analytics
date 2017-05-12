<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      height: 55px;
      background: $modules-header-color;

      display: flex;
      flex-direction: row;
      flex-grow: 0;
      flex-shrink: 0;
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
    transform: translate3d(100%, 0, 0);
  }
  .to-the-right .modules-fade-enter-active {
    transform: translate3d(-100%, 0, 0);
  }
  
  .modules-fade-enter {
    will-change: transform;
    transform: translate3d(0, 0, 0)!important;
    transition: transform .4s ease;
  }

  .modules-fade-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .modules-fade-leave {
    will-change: transform;
    transition: transform .4s ease;
  }

  .to-the-left .modules-fade-leave {
    transform: translate3d(-100%, 0, 0);
  }
  .to-the-right .modules-fade-leave {
    transform: translate3d(100%, 0, 0);
  }
</style>

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { attachRouterRedux } from 'store/utils';

import { Link, Route } from 'react-router-dom';

import { Calendar } from 'modules/calendar/calendar.jsx';
import { Settings } from 'modules/settings/settings.jsx';
import Header from 'modules/header/header.jsx';
import Transition from 'plugins/transition.jsx';
import * as actions from './actions';

class Main extends Component {
  swipeLeft = false;
  constructor(props) {
    super(props);
    this.state = {
      modules: {
        calendar: 0,
        settings: 1,
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
      '/calendar/:comp': () => {
        console.log('main calendar', arguments);
        this.props.setActive('calendar');
      },
      '/calendar': () => {
        console.log('main ONLY calendar', arguments);
      },
      '/settings': () => {
        console.log('main settings', arguments);
        this.props.setActive('settings');
      },
      '/': () => {
        console.log('main /', arguments);
        this.props.setActive();
      }
    };
  }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <Header active={this.props.active}/>
        </div>
        <div className={this.swipeLeft ?
          'modules-container__modules to-the-left' :
          'modules-container__modules to-the-right'}>
          <Transition duration={500}
                      className="modules-container__modules-wrapper"
                      name="modules-fade">
            <Calendar key="calendar" path='/calendar' className="booster"/>
            <Settings key="settings" path='/settings' className="booster"/>
          </Transition>
        </div>
      </div>
    );
  }
  componentWillUpdate(nextProps) {
    if (this.props.active !== nextProps.active)
      this.swipeLeft = this.state.modules[this.props.active] < this.state.modules[nextProps.active || ''];
  }
}
Main.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    staticContext: PropTypes.object
  }).isRequired
}

export default attachRouterRedux(Main);
