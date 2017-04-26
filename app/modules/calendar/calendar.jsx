<style lang="sass">
  .calendar {
    display: flex;
    flex-grow: 1;
    color: white;
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import CalendarDesk from './calendar.desk.jsx';

import * as actions from './actions';
import * as mainActions from 'modules/main/actions';

class Calendar extends Component {
  constructor(props) {
    super(props);
  }
  static mapState (store) {
    return {
      date: store.calendar.date
    };
  }
  static mapActions = {
    ...actions,
    removeActive: mainActions.removeActive,
    setActive: mainActions.setActive
  }
  render() {
    const classList = ['calendar'];
    return (
      <div className={classList.join(' ')}>
        <Route path="/" render={() => <CalendarDesk test3="dsfdsssgssd"/>} />
        <Route path="/desk" component={CalendarDesk} />
      </div>
    );
  }
  componentDidMount() {
    this.props.setActive('calendar');
  }
  componentWillUnmount() {
    this.props.removeActive('calendar');
  }
}
Calendar.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRedux(Calendar);
