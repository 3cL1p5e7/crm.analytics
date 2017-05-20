<style lang="sass">
  @import '~uikit/theme';

  .profile-sign-up {

  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

class ProfileSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`profile-sign-up ${this.props.className || ''}`}>
      </div>
    );
  }
}

export default attachRouterRedux(ProfileSignup);