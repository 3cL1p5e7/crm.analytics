<style lang="sass">
  @import '~uikit/theme';

  

  .profile-sign-in {
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
        border: none;
        background-color: transparent!important;
        outline: none;

        height: 30px;
        font-size: 19px;
        border-bottom: 2px solid grey;
        color: white;

        transition: color .2s ease;

        &:focus {
          color: $modules-header-text-color;
          border-bottom: 2px solid $modules-header-text-color;
        }
        &:hover {
          color: $modules-header-text-color;
          border-bottom: 2px solid $modules-header-text-color;
        }
      }
      
      // input:focus::-webkit-input-placeholder {
      //   color: $modules-header-text-color;
      // }
      // input:hover::-webkit-input-placeholder {
      //   color: $modules-header-text-color;
      // }
    }

    &--login {
      input {
        flex-grow: 1;
      }
    }
    &--password {
      margin-bottom: 10px!important;

      input {
        flex-grow: 1;
      }
    }
    &--additionals {
      flex-direction: column!important;
      justify-content: flex-start;
      align-items: center;

      margin-bottom: 0!important;

      div {
        color: white;
        cursor: pointer;

        &:hover {
          color: $modules-header-text-color;
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
      login: '',
      password: ''
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.forgot = this.forgot.bind(this);
  }
  static mapState(store) {
    return {
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className={`profile-sign-in ${this.props.className || ''}`}>
        <div className="profile-sign-in--login">
          <input type="text" autoFocus="autofocus" placeholder="Email"
                 value={ this.state.login } onChange={ this.handleLoginChange }/>
        </div>
        <div className="profile-sign-in--password">
          <input type="password" placeholder="Password"
                 value={ this.state.password } onChange={ this.handlePasswordChange }/>
        </div>
        <div className="profile-sign-in--additionals">
          <div className="forgot"
               onClick={ this.forgot }>Forgot password?</div>
        </div>
      </div>
    );
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  forgot() {
    this.context.router.history.pushSearch('sign', 'forgot');
  }
}

ProfileSignin.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(ProfileSignin);