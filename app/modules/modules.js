<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      height: 55px;
      background: $modules_header_color;
      flex-grow: 0;
      flex-shrink: 0;
    }
    &__modules {
      background-color: $modules_body_color;
      display: flex;
      flex-grow: 1;
      padding: 1rem;
    }
  }
</style>

import React, { Component } from 'react';
import { Link, Route, browserHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Calendar from './calendar/calendar.js';

export default class Modules extends Component {
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <Link to="/calendar">HELLO</Link>
        </div>
        <div className="modules-container__modules">
          <Route path="/calendar" component={Calendar} />
        </div>
      </div>
    );
  }
}
Modules.contextTypes = {
  router: PropTypes.object.isRequired
}
