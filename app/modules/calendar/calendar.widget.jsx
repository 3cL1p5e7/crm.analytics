<style lang="sass">
  @import '~uikit/theme';
  .calendar-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: radial-gradient(circle farthest-side at center, $calendar-widget-color, transparent);

    &__title {
      display: flex;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 30px;

      color: $modules-header-text-color;
    }
  }

  @media (max-width: $phablet) { 
    .calendar-widget__title {
      font-size: 20px;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import moment from 'plugins/moment';

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
        <div className="calendar-widget__title">{moment().format('D MMMM, YYYY')}</div>
      </div>
    );
  }
}

export default attachRouterRedux(CalendarWidget);