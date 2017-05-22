<style lang="sass">
  @import '~uikit/theme';
  .calendar-layout {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    color: white;
    
    // &:before {
    //   background-image: url(./map.png);
    //   background-repeat: no-repeat;
    //   background-position: 50% 170px;
    //   background-size: 50%;
    //   filter: blur(11px);
    //   content: "";
    //   position: fixed;
    //   left: 0;
    //   right: 0;
    //   z-index: -1;
    // }
    &__board {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      flex-grow: 1;

      &--header {
        width: 100%;
        box-sizing: border-box;
      }
      &--body {
        width: 100%;
        color: black;
        &__week {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      }
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import { CalendarHeader, CalendarCell } from './stuff';

import * as actions from './actions';

class CalendarLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static mapState = (store) => {
    return {
      weeks: store.calendar.weeks,
      activeDay: store.calendar.activeDay
    };
  }
  static mapActions = {
    ...actions
  }
  render() {
    return (
      <div className={`calendar-layout ${this.props.className || ''}`}>
        <div className="calendar-layout__board">
          <CalendarHeader className="calendar-layout__board--header"/>
          <div className="calendar-layout__board--body">
            {
              this.props.weeks.map((week, index) =>
                <div className="calendar-layout__board--body__week" key={index}>
                  { 
                    week.map((day, dayIndex) => 
                      <CalendarCell key={dayIndex} moment={day}/>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.setWeeks(this.props.activeDay);
  }
}
export default attachRouterRedux(CalendarLayout);
