<style lang="sass">
  @import '~uikit/theme';

  .profile-sign-in {
    display: flex;
    flex-direction: column;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from '../actions';

class ProfileSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static mapState(store) {
    return {
      logged: store.profile.logged
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className={`profile-sign-in ${this.props.className || ''}`}>
      sddsffdsfsf dssdf s fsdsdffsdfdsf ds <br/>
      sddsffdsfsf dssfsdfdsfsdf s fsdf ds <br/>
      sddsffdsfsf dssdf s fsdffsfsssdfd ds <br/>
      sddsffdsfsf dssfsdfsdfsddf s fsdf ds <br/>
      sddsffdsfsf dssdf s fsdf ds <br/>
      sddsffdsfdsfdsfsf dssdf s fsdf ds <br/>
      </div>
    );
  }
}

export default attachRouterRedux(ProfileSignin);