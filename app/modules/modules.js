<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;

    &__header {
      height: 55px;
      background: $modules_header_color;
    }
    &__modules {
      background-color: $modules_body_color;
      display: flex;
      flex-basis: 100%;
    }
  }
</style>

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import Calendar from './calendar/calendar.js';

export default class Modules extends Component {
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
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
