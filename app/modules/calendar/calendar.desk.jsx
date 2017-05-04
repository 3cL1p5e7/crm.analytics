<style lang="sass">
  @import '~uikit/theme';
  .calendar-desk {
    display: flex;
    flex-grow: 1;

    padding: 10px;

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
      flex-grow: 1;
      background: white;
      border: 1px solid red;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';

class CalendarDesk extends Component {
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
      <div className="calendar-desk">
        <div className="calendar-desk__board">
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.setActiveModule('desk');
  }
}
export default attachRedux(CalendarDesk);
