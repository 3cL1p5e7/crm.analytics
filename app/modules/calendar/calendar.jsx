<style lang="sass">
  @import '~uikit/theme';
  .calendar {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    color: white;
    background: $modules-body-color;

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

import CalendarLayout from './calendar.layout.jsx';
import CalendarList from './calendar.list.jsx';
import Transition from 'plugins/transition.jsx';

import * as actions from './actions';

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
    ...actions
  }
  static routeHandler() {
    return {
      routeName: 'calendar',
      routes: {
        '/layout': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveCalendar('layout'));
        },
        '/list': (location, match, dispatch) => {
          dispatch(this.mapActions.setActiveCalendar('list'));
        }
      }
    };
  }
  render() {
    return (
      <div className={`calendar ${this.props.className || ''}`}>
        <Transition duration={300}
                    switch={this.props.active}
                    className="calendar__wrapper"
                    name="calendar-fade">
          <CalendarList key="list" case="list" className="booster" />
          <CalendarLayout key="layout" case="layout" className="booster" />
        </Transition>
      </div>
    );
  }
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
export default attachRouterRedux(Calendar);
