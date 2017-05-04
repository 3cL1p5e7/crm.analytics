<style lang="sass">
  @import '~uikit/theme';
  .calendar-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: radial-gradient(circle farthest-side at center, $calendar-color, transparent);

    &__title {
      display: flex;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
        <div className="calendar-widget__title">It is fucking widget</div>
      </div>
    );
  }
}

export default attachRedux(CalendarWidget);