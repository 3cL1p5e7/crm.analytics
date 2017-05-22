<style lang="sass">
  @import '~uikit/theme';
  .calendar-cell {
    position: relative;

    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;

    padding: 0 10px 0 10px;

    &--header {
      display: flex;
      flex-direction: row;
      justify-content: space-between
    }
    &__date {

    }
    &__month {
    }
    &__content {
      height: 100px;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

class CalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`calendar-cell ${this.props.className || ''}`}>
        <div className="calendar-cell--header">
          <div className="calendar-cell__date">{ this.props.moment.date() }</div>
          <div className="calendar-cell__month">{ this.props.moment.format('MMMM') }</div>
        </div>
        <div className="calendar-cell__content">a dasd ada da dsa<br />ada da dsa<br />ada da dsa<br />ada da dsa<br /></div>
      </div>
    );
  }
}
export default attachRouterRedux(CalendarCell);
