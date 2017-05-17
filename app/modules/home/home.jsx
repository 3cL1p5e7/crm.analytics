<style lang="sass">
  @import '~uikit/theme';
  .home {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: $modules-body-color;

    &__options {
      height: 80px;
    }
    &__primary-row {
      flex-grow: 4;
    }
    &__secondary-row {
      flex-grow: 2;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import HomeWidget from './home.widget.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classList = ['home'];
    classList.push(this.props.className);
    return (
      <div className={classList.join(' ')}>
        <div className="home__options"></div>
        <div className="home__primary-row"></div>
        <div className="home__secondary-row"></div>
      </div>
    );
  }
}
Home.contextTypes = {
  router: PropTypes.object.isRequired
}

const reduxed = attachRouterRedux(Home);
export { reduxed as Home, HomeWidget }
