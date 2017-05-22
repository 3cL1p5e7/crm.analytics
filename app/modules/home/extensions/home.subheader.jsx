<style lang="sass">
  @import '~uikit/theme';
  .home-subheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &-option {
      height: 30px;
      width: 30px;
      margin: 0 10px 0 10px;
      cursor: pointer;

      background-color: yellow;

      transition: background-color .3s ease;
      &.option-activated {
        background-color: $modules-header-text-color
      }
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import Transition from 'plugins/transition.jsx';

class HomeSubheader extends Component {
  constructor(props) {
    super(props);
  }
  static mapState(store) {
    return {
      active: store.home.active
    };
  }
  render() {
    return (
      <div className="home-subheader">
        <div className={`home-subheader-option ${this.props.active === 'dash' ? 'option-activated' : ''}`}
             onClick={this.goToLink('dash')}>
        </div>
        <div className={`home-subheader-option ${this.props.active === 'feed' ? 'option-activated' : ''}`}
             onClick={this.goToLink('feed')}>
        </div>
      </div>
    );
  }

  goToLink(module) {
    return () => {
      if (module === this.props.active)
        return;
      this.context.router.history.push(`/home/${module}`);
    };
  }
}
HomeSubheader.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(HomeSubheader);
