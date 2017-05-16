<style lang="sass">
  @import '~uikit/theme';
  .settings-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: radial-gradient(circle farthest-side at center, $settings-widget-color, transparent);

    &__title {
      display: flex;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;

      color: $modules-header-text-color;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
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
        <div className="settings-widget__title">settings</div>
      </div>
    );
  }
}

export default attachRouterRedux(SettingsWidget);