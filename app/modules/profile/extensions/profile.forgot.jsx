<style lang="sass">
  @import '~uikit/theme';

  .profile-forgot {
    display: flex;
    flex-direction: column;

    padding: 25px 50px 25px 50px;

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      

      margin: 0 0 20px 0;

      input {
        flex-grow: 1;
        border: none;
        background-color: transparent!important;
        outline: none;

        height: 30px;
        font-size: 19px;
        border-bottom: 2px solid grey;
        color: white;

        &:focus {
          border-bottom: 2px solid $modules-header-text-color;
        }
      }
    }
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
      email: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  static mapState(store) {
    return {
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className={`profile-forgot ${this.props.className || ''}`}>
        <div className="profile-forgot--login">
          <input type="text" autoFocus="autofocus" placeholder="Login / Email"
                 value={ this.state.email } onChange={ this.handleEmailChange }/>
        </div>
      </div>
    );
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
}

export default attachRouterRedux(ProfileSignin);