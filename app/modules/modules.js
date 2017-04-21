const css = <style>
  .modules-container {
    display: flex;
    flex-direction: column;

    &__header {
      height: 55px;
      background-color: red;
    }
    &__modules {
      background-color: green;
      display: flex;
      flex-basis: 100%;
    }
  }
</style>

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import Calendar from './calendar/calendar';

export default class Modules extends Component {
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          sdf sdfsdfsd fds fdsds fdsf
        </div>
        <div className="modules-container__modules">
           sfdsd sdfds fdsf ds fds
          <Route path="/calendar" component={Calendar} />
        </div>
      </div>
    );
  }
}
Modules.contextTypes = {
  router: PropTypes.object.isRequired
}
