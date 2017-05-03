<style lang="sass">
  .settings {
    display: flex;
    flex-grow: 1;
    background-color: yellow;
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import * as mainActions from 'modules/main/actions';
import SettingsWidget from './settings.widget.jsx';

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  static mapActions = {
    removeActive: mainActions.removeActive,
    setActive: mainActions.setActive
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
  componentDidMount() {
    this.props.setActive('settings');
  }
  componentWillUnmount() {
    this.props.removeActive('settings');
  }
}
Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

const reduxed = attachRedux(Settings);
export { reduxed as Settings, SettingsWidget }
