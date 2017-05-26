<style lang="sass">
  @import '~uikit/theme';
  .subheader {
    display: flex;
    justify-content: center;
    flex-grow: 1;

    height: 80px;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { CalendarSubheader } from 'modules/calendar/extensions';
import { HomeSubheader } from 'modules/home/extensions';

class Subheader extends Component {
  constructor(props) {
    super(props);
  }
  static mapState(store) {
    return {
    };
  }
  render() {
    return (
      <div className="subheader">
        { this.props.active === 'home' ? <HomeSubheader/> : null }
        { this.props.active === 'calendar' ? <CalendarSubheader/> : null }
      </div>
    );
  }
}
Subheader.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Subheader);
