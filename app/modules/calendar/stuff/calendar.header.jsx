<style lang="sass">
  @import '~uikit/theme';
  .calendar-header {
    display: flex;
    flex-direction: row;

    &__day {
      flex-grow: 1;
      flex-basis: 0;
      
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;

      color: #00293c;
      padding: 0 8px 0 8px;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`calendar-header ${this.props.className || ''}`}>
        {
          this.localization.weekdays.map((day) =>
            <div key={day} className="calendar-header__day">
              {day}
            </div>
          )
        }
      </div>
    );
  }
}
export default attachRouterRedux(CalendarHeader);
