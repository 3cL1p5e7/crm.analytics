<style lang="sass">
  .settings-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    
    //background-color: rgba(0, 0, 255, 0.5);
    background: linear-gradient(to right, transparent, rgba(204, 255, 0, 0.5), transparent);
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';

class SettingsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`settings-widget ${this.props.className || ''}`}>
        It is SETTINGS! widget
      </div>
    );
  }
}

export default attachRedux(SettingsWidget);