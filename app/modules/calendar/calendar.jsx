<style lang="sass">
  @import '~uikit/theme';
  .calendar {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    color: white;
    background: $modules-body-color;

    &__options {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      height: 80px;

      &-icon {
        margin: 0 10px 0 10px;
        cursor: pointer;

        fill: black;
        transition: fill .3s ease;
        &.icon-activated {
          fill: $modules-header-text-color
        }

      }
    }

    &__wrapper {
      position: relative;
      flex-grow: 1;

       > div {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;

        transition: opacity .3s ease;
      }
    }
  }

  .calendar-fade-enter-active {
    opacity: 0;
  }
  
  .calendar-fade-enter {
    will-change: opacity;
    opacity: 1!important;
    transition: opacity .3s ease;
  }

  .calendar-fade-leave-active {
    opacity: 1;
  }
  .calendar-fade-leave {
    will-change: opacity;
    opacity: 0!important;
    transition: opacity .3s ease;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import CalendarDesk from './calendar.desk.jsx';
import CalendarList from './calendar.list.jsx';
import CalendarWidget from './calendar.widget.jsx';
import Transition from 'plugins/transition.jsx';

import moment from 'plugins/moment';

import * as actions from './actions';
import * as mainActions from 'modules/main/actions';

class Calendar extends Component {
  constructor(props) {
    super(props);
  }
  static mapState (store) {
    return {
      date: store.calendar.date,
      active: store.calendar.active
    };
  }
  static mapActions = {
    ...actions,
    removeActive: mainActions.removeActive,
    setActive: mainActions.setActive
  }
  static routeHandler() {
    return {
      '/calendar/desk/:comp': () => {
        console.log('CALENDAR desk', arguments);
      },
      '/calendar/desk': () => {
        console.log('CALENDAR ONLY desk', arguments);
      },
      '/calendar/list/:comp': () => {
        console.log('CALENDAR list', arguments);
      },
      '/calendar/list': () => {
        console.log('CALENDAR ONLY list', arguments);
      }
    };
  }
  render() {
    const classList = ['calendar'];
    classList.push(this.props.className);
    return (
      <div className={classList.join(' ')}>
        <div className="calendar__options">
          <svg className={`calendar__options-icon ${this.props.active === 'desk' ? 'icon-activated' : ''}`}
               width="38" height="38"
               onClick={this.goToLink('desk')}>
            <use xlinkHref={`#icon-desk-${moment().format('E')}`} />
          </svg>
          <svg className={`calendar__options-icon ${this.props.active === 'list' ? 'icon-activated' : ''}`}
               width="38" height="38"
               onClick={this.goToLink('list')}>
            <use xlinkHref='#icon-list' />
          </svg>
        </div>
        <Transition duration={300}
                    className="calendar__wrapper"
                    name="calendar-fade">
          <CalendarList key="list" path='/calendar/list' className="booster"/>
          <CalendarDesk key="desk" path='/calendar/desk' className="booster"/>
        </Transition>
      </div>
    );
  }
  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/calendar/${module}`);
      this.props.setActiveModule(module);
    };
  }
  // componentDidMount() {
  //   this.props.setActive('calendar');
  // }
  // componentWillUnmount() {
  //   this.props.removeActive('calendar');
  // }
}
Calendar.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    staticContext: PropTypes.object
  }).isRequired
}
const reduxed = attachRouterRedux(Calendar);
export { reduxed as Calendar, CalendarWidget }
