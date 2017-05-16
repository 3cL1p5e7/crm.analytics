<style lang="sass">
  @import '~uikit/theme';
  .home-widget {
    display: flex;
    align-items: center;
    justify-content: center;

    background: radial-gradient(circle farthest-side at center, $home-widget-color, transparent);

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

class HomeWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`home-widget ${this.props.className || ''}`}>
        <div className="home-widget__title">home</div>
      </div>
    );
  }
}

export default attachRouterRedux(HomeWidget);