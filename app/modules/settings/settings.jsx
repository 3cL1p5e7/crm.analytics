<style lang="sass">
  @import '~uikit/theme';
  .settings {
    display: flex;
    flex-grow: 1;
    background-color: $modules-body-color;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import * as mainActions from 'modules/main/actions';

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  static mapActions = {
    removeActive: mainActions.removeActive
  }
  render() {
    return (
      <div className={`settings ${this.props.className || ''}`}>
        This is HacTPouku
      </div>
    );
  }
}
Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(Settings);
