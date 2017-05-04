<style lang="sass">
  @import '~uikit/theme';
  .calendar-list {
    display: flex;
    flex-grow: 1;

    padding: 10px;

    color: red;

    &__board {
      flex-grow: 1;
      background: yellow;
      border: 1px solid green;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
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
      <div className="calendar-list">
        <div className="calendar-list__board">
          THIS>IS LIIIIIIIISTTTTT
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.setActiveModule('list');
  }
}
export default attachRedux(CalendarList);
