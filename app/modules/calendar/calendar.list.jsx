<style lang="sass">
  @import '~uikit/theme';
  .calendar-list {
    display: flex;
    flex-grow: 1;

    color: red;

    &__board {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      
      background: yellow;
      border: 1px solid green;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';

class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static mapActions = {
    ...actions
  }
  render() {
    return (
      <div className={`calendar-list ${this.props.className || ''}`}>
        <div className="calendar-list__board">
          THIS>IS LIIIIIIIISTTTTT
        </div>
      </div>
    );
  }
}
export default attachRouterRedux(CalendarList);
