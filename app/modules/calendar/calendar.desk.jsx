<style lang="sass">
  @import '~uikit/theme';
  .calendar-desk {
    display: flex;
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
      justify-content: center;
      flex-grow: 1;
      
      background: #339966;
      border: 1px solid red;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
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
    const classList = ['calendar-desk'];
    classList.push(this.props.className);
    return (
      <div className={classList.join(' ')}>
        <div className="calendar-desk__board">
        </div>
      </div>
    );
  }
}
export default attachRouterRedux(CalendarDesk);
