<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      height: 55px;
      background: $modules_header_color;

      display: flex;
      flex-direction: row;
      flex-grow: 0;
      flex-shrink: 0;
    }
    &__links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      transition: all .5s ease;

      /*&-exit-btn {
        display: flex;
        align-items: center;

        position: absolute;
        left: 0;
        width: 55px;
        height: 55px;
        margin-left: 10px;
        z-index: 1;
        opacity: 0;
        transition: opacity .3s ease;

        &--active {
          opacity: 1;
          z-index: 0;
        }
      } */
      &-wrapper {
        display: flex;
        .widget {
          width: 450px;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        margin: 0 10px 0 10px;
        cursor: pointer;
        z-index: 2;
        width: 100px;
        transition: width .4s ease;
        &--active {

        }
      }
    }
    &__modules {
      background-color: $modules_body_color;
      display: flex;
      flex-grow: 1;

      &-wrapper {
        > div {
          transition: opacity .5s, transform .4s ease;
        }

        display: flex;
        flex-grow: 1;
      }
    }
  }

  .modules-fade-enter-active {
    opacity: 0;
  }
  .to-the-left .modules-fade-enter-active {
    transform: translateX(100%);
  }
  .to-the-right .modules-fade-enter-active {
    transform: translateX(-100%);
  }
  
  .modules-fade-enter {
    opacity: 1;
    transform: translateX(0)!important;
    transition: opacity .5s, transform .4s ease;
  }

  .modules-fade-leave-active {
    transform: translateX(0);
    opacity: 1;
  }
  .modules-fade-leave {
    opacity: 0!important;
    transition: opacity .5s, transform .4s ease;
  }

  .to-the-left .modules-fade-leave {
    transform: translateX(-100%);
  }
  .to-the-right .modules-fade-leave {
    transform: translateX(100%);
  }


  .items-fade-enter-active {
    opacity: 0;
    width: 0!important;
  }

  .items-fade-enter {
    opacity: 1;
    width: 100px!important;
    transition: opacity .5s, width .4s ease;
    &.widget {
      width: 450px!important;
    }
  }

  .items-fade-leave-active {
    opacity: 1;
  }
  .items-fade-leave {
    opacity: 0!important;
    transition: opacity .5s ease;
    &.widget {
      width: 0!important;
      transition: opacity .5s, width .4s ease;
    }
  }
</style>

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { attachRedux } from 'store/utils';

import { Link, Route } from 'react-router-dom';

import { Calendar, CalendarWidget } from 'modules/calendar/calendar.jsx';
import Settings from 'modules/settings/settings.jsx';
import Transition from 'plugins/transition.jsx';
import * as actions from './actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: {
        calendar: 0,
        settings: 1,
        '': 2
      },
      toRight: false
    };
  }
  static mapState(store) {
    return {
      active: store.main.active
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <div className="modules-container__links"
               style={{ flexGrow: this.props.active ? 1 : 0 }}>
            {/*<div className={
              'modules-container__links-exit-btn ' +
              (this.props.active ? 'modules-container__links-exit-btn--active' : '')
            }>
              <svg className='svg-icon' width="38" height="38">
                <use xlinkHref='#icon-back' />
              </svg>
            </div>*/}
            <Transition duration={500}
                        className="modules-container__links-wrapper"
                        transitionClass="items-fade">
              <CalendarWidget path='/calendar' className="widget" />
              <div className={
                'modules-container__links-item ' + (this.props.active === 'calendar' ? 'modules-container__links-item--active' : '')
              }
              onClick={this.goToLink('calendar')}>calendare.</div>
            </Transition>
            <Transition duration={500}
                        className="modules-container__links-wrapper"
                        transitionClass="items-fade">
              <CalendarWidget path='/settings' className="widget" />
              <div className={
                  'modules-container__links-item ' + (this.props.active === 'settings' ? 'modules-container__links-item--active' : '')
                }
                onClick={this.goToLink('settings')}>settingse..</div>
            </Transition>
            <div className="modules-container__links-item" onClick={this.goToLink('')}>exite...</div>
          </div>
        </div>
        <div className={this.state.toRight ?
          'modules-container__modules to-the-left' :
          'modules-container__modules to-the-right'}>
          <Transition duration={500} 
                      className="modules-container__modules-wrapper"
                      transitionClass="modules-fade">
            <Calendar path='/calendar'/>
            <Settings path='/settings'/>
          </Transition>
        </div>
      </div>
    );
  }
  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.setState({ toRight: this.state.modules[this.props.active] < this.state.modules[module] });
      this.context.router.history.push(`/${module}`);
      if (module.length === 0)
        this.props.removeActive();
      else this.props.setActive(module);
    };
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

export default attachRedux(Main);
