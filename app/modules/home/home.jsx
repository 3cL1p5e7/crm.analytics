<style lang="sass">
  @import '~uikit/theme';
  .home {
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
        HOME PAGE
        TROLOLO
      </div>
    );
  }
}
Home.contextTypes = {
  router: PropTypes.object.isRequired
}

const reduxed = attachRouterRedux(Home);
export { reduxed as Home, HomeWidget }
