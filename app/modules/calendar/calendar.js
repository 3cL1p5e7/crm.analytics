const css = <style>
  .zalupa{
    color: red;
  }
  .calendar {
    background: red;
    color: white;
  }
</style>

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import CalendarDesk from './calendar.desk';
export default class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <Route path="/" component={CalendarDesk} />
        <Route path="/desk" component={CalendarDesk} />
      </div>
    );
  }
}
Calendar.contextTypes = {
  router: PropTypes.object.isRequired
}
