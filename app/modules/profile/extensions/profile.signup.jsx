<style lang="sass">
  @import '~uikit/theme';

  .profile-sign-up {
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
    }

    &--login {
      input {
        flex-grow: 1;
      }
    }
    &--name {
      input {
        flex-grow: 1;
      }
    }
    &--password {
      margin-bottom: 10px;
      input {
        flex-grow: 1;
      }
    }
    &--additionals {
      flex-direction: column!important;
      justify-content: flex-start;
      align-items: center;

      div {
        color: white;
        cursor: pointer;
      }
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from '../actions';

class ProfileSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: '',
      password: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  static mapState(store) {
    return {
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className={`profile-sign-up ${this.props.className || ''}`}>
        <div className="profile-sign-up--name">
          <input type="text" autoFocus="autofocus" placeholder="Name"
                 value={ this.state.name } onChange={ this.handleNameChange }/>
        </div>
        <div className="profile-sign-up--login">
          <input type="text" placeholder="Email"
                 value={ this.state.login } onChange={ this.handleLoginChange }/>
        </div>
        <div className="profile-sign-up--password">
          <input type="password" placeholder="Password"
                 value={ this.state.password } onChange={ this.handlePasswordChange }/>
        </div>
        { /*<div className="profile-sign-up--additionals">
          <div className="forgot"
               onClick={ this.agree }>Forgot password?</div>
        </div>
        */ }
      </div>
    );
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
}

ProfileSignup.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRouterRedux(ProfileSignup);