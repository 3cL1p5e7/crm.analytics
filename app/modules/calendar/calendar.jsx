<style lang="sass">
  .calendar {
    display: flex;
    flex-grow: 1;
    color: white;
  }
</style>

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import CalendarDesk from './calendar.desk.jsx';
export default class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <Route path="/" render={() => <CalendarDesk test3="dsfdsssgssd"/>} />
        <Route path="/desk" component={CalendarDesk} />
      </div>
    );
  }
  componentDidMount() {
    console.log('mount calendar');
  }
}
Calendar.contextTypes = {
  router: PropTypes.object.isRequired
}
