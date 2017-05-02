<style lang="sass">
  .calendar-widget {
    display: flex;
    background-color: red;
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';

class CalendarWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={ `calendar-widget ${this.props.className || ''}` }>
        It is widget
      </div>
    );
  }
}

export default attachRedux(CalendarWidget);