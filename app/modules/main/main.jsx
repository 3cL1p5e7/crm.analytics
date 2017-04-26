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

      a {
        display: flex;
        align-items: stretch;
        cursor: pointer;
        z-index: 1;
        
        margin: 0 10px 0 10px;
      }
      
    }
    &__links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      transition: all .5s ease;

      &-exit-btn {
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
      }
      &-item {
        display: flex;
        align-items: center;
      }
    }
    &__modules {
      background-color: $modules_body_color;
      display: flex;
      flex-grow: 1;
      padding: 1rem;

      &-wrapper {
        display: flex;
        flex-grow: 1;
      }
    }
  }
</style>

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { attachRedux } from 'store/utils';

import { Link, Route } from 'react-router-dom';

import Calendar from 'modules/calendar/calendar.jsx';
import Settings from 'modules/settings/settings.jsx';
import Transition from 'plugins/transition.jsx';

import * as actions from './actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static mapState(store) {
    return {
      active: store.main.active,
      hiding: null
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <div className="modules-container__links"
               style={{ flexGrow: this.props.active ? 1 : 0 }}>
            <div className={
              'modules-container__links-exit-btn ' +
              (this.props.active ? 'modules-container__links-exit-btn--active' : '')
            }>
              <svg className='svg-icon' width="38" height="38">
                <use xlinkHref='#icon-back' />
              </svg>
            </div>
            <a onClick={this.goToLink('calendar')} style={{ textDecoration: 'none' }}>
              <div className="modules-container__links-item">calendare.</div>
            </a>
            <a onClick={this.goToLink('settings')} style={{ textDecoration: 'none' }}>
              <div className="modules-container__links-item">settingse..</div>
            </a>
            <a onClick={this.goToLink('')} style={{ textDecoration: 'none' }}>
              <div className="modules-container__links-item">exite...</div>
            </a>
          </div>
        </div>
        <div className="modules-container__modules">
          <Transition duration={1000} className="modules-container__modules-wrapper">
            <Calendar path='/calendar'/>
            <Settings path='/settings'/>
          </Transition>
        </div>
      </div>
    );
  }
  goToLink(module) {
    return () => {
      // <Route path='/calendar' component={Calendar} />
      //   <Route path='/settings' component={Settings} />
      // if (!this.props.active)
        this.context.router.history.push(`/${module}`);
      // else {
      //   this.setState({ hiding: this.props.active });
      //   setTimeout(() => {
      //     this.context.router.history.push(`/${module}`);
      //     this.setState({ hiding: null });
      //   }, 300);
      // }
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
