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
import SettingsWidget from './settings.widget.jsx';

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  static mapActions = {
    removeActive: mainActions.removeActive
  }
  render() {
    const classList = ['settings'];
    classList.push(this.props.className);
    return (
      <div className={classList.join(' ')}>
        This is HacTPouku
      </div>
    );
  }
}
Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

const reduxed = attachRouterRedux(Settings);
export { reduxed as Settings, SettingsWidget }
