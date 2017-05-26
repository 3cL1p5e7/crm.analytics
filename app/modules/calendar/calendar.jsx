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

  .calendar-fade-enter {
    opacity: 0;
  }
  
  .calendar-fade-enter.calendar-fade-enter-active {
    will-change: opacity;
    opacity: 1;
    transition: opacity .3s ease;
  }

  .calendar-fade-leave {
    opacity: 1;
  }
  .calendar-fade-leave.calendar-fade-leave-active {
    will-change: opacity;
    opacity: 0;
    transition: opacity .3s ease;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import CalendarLayout from './calendar.layout.jsx';
import CalendarList from './calendar.list.jsx';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
  getItem() {
    switch (this.props.active) {
      case 'list':
        return <CalendarList key="list" className="booster" />;
      case 'layout':
        return <CalendarLayout key="layout" className="booster" />;
    }
  }
  render() {
    const item = this.getItem();
    return (
      <div className={`calendar ${this.props.className || ''}`}>
        <CSSTransitionGroup className='calendar__wrapper'
                            component="div"
                            transitionName="calendar-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
          { item }
        </CSSTransitionGroup>
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
