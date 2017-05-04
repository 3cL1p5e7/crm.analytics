<style lang="sass">
  @import '~uikit/theme';
  .calendar-desk {
    flex-grow: 1;
    background: $calendar-color;
    color: white;
    h1 {
      padding: 10px;
    }
    &__trololo-section {
      color: red;
    }
  }
</style>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class CalendarDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test1: 'eeee pooookkkkk',
      test2: 'eterererere',
      time: 'tetetete'
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="calendar-desk">
        <h1>{ this.state.test1 }</h1>
        <div className="calendar-desk__trololo-section">
          <h1>{ this.props.test3 }</h1>
          <h2>{ this.state.test2 }</h2>
          <h1>{ this.state.time }</h1>
        </div>
      </div>
    );
  }
  
}
