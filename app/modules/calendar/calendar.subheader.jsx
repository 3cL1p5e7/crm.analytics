<style lang="sass">
  @import '~uikit/theme';
  .calendar-subheader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      height: 80px;

      &-icon {
        margin: 0 10px 0 10px;
        cursor: pointer;

        fill: black;
        transition: fill .3s ease;
        &.icon-activated {
          fill: $modules-header-text-color
        }
      }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';

import moment from 'plugins/moment';

import * as mainActions from 'modules/main/actions';

class CalendarSubheader extends Component {
  constructor(props) {
    super(props);
  }
  static mapState(store) {
    return {
    };
  }
  render() {
    return (
      <div className="calendar__subheader">
        <svg className={`calendar__subheader-icon ${this.props.active === 'desk' ? 'icon-activated' : ''}`}
          width="38" height="38"
          onClick={this.goToLink('desk')}>
          <use xlinkHref={`#icon-desk-${moment().format('E')}`} />
        </svg>
        <svg className={`calendar__subheader-icon ${this.props.active === 'list' ? 'icon-activated' : ''}`}
          width="38" height="38"
          onClick={this.goToLink('list')}>
          <use xlinkHref='#icon-list' />
        </svg>
      </div>
    );
  }

  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/calendar/${module}`);
    };
  }
}
CalendarSubheader.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(CalendarSubheader);
