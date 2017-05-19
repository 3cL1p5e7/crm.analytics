<style lang="sass">
  @import '~uikit/theme';
  .profile {
    display: flex;
    flex-grow: 1;
    background-color: $modules-body-color;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';



class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`profile ${this.props.className || ''}`}>
        ProfilePAGE
        yeah
      </div>
    );
  }
}
Profile.contextTypes = {
  router: PropTypes.object.isRequired
}

const reduxed = attachRouterRedux(Home);
export { reduxed as Profile, ProfileWidget }
