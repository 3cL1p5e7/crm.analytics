<style lang="sass">
  @import '~uikit/theme';
  .subheader {
    height: 80px;
    background: yellow;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';
import { CalendarSubheader } from 'modules/calendar/calendar.jsx';

import * as mainActions from 'modules/main/actions';

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
        <CalendarSubheader/>
      </div>
    );
  }

  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/${module}`);
    };
  }
}
Subheader.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Subheader);
