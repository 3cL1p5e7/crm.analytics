<style lang="sass">
  @import '~uikit/theme';

  .profile-sign {
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    
      min-height: 200px;

      &--label {
        font-size: 50px;
        color: white;
      }
    }
    &__switcher {
      display: flex;
      flex-direction: row;
      justify-content: center;

      min-height: 40px;
      &-active {
        color: $modules-header-text-color!important;
      }
      &--item {
        display: flex;
        align-items: center;

        font-size: 20px;
        color: white;
        cursor: pointer;

        margin: 0 10px 0 10px;
      }
    }
    &__footer {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-main-row {
        display: flex;
        flex-direction: row;
        justify-content: center;

        margin-bottom: 8px;
      }
      &-social-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        
        &--vk {
          margin-right: 8px;
        }
        &--google {
          margin-right: 8px;
        }
      }

      &--confirm {
        cursor: pointer;
        font-size: 20px;
        color: $modules-header-text-color;

        border: 2px solid $modules-header-text-color;
        border-radius: 15px;
        padding: 2px 8px 2px 8px;
      }
    }
  }

  .sign-fade-enter-active {
    opacity: 0;
  }
  .sign-fade-enter {
    opacity: 1;
    transition: opacity .3s ease;
  }

  .sign-fade-leave-active {
    opacity: 1;
  }
  .sign-fade-leave {
    opacity: 0!important;
    transition: opacity .3s ease;
  }
  .test {
    display: none;
  }
</style>

import React, { Component } from 'react';
// import { DOMProperty } from 'react/lib/ReactInjection'
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from '../actions';

import { ProfileSignin, ProfileSignup, ProfileForgot } from './';
import { VkControl, FbControl, GoogleControl } from 'uikit/controls';
import Transition from 'plugins/transition.jsx';

import { changeParam } from 'store/utils';
import auth from 'plugins/auth.js';

class ProfileSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static mapState(store) {
    return {
      activeForm: store.profile.activeForm
    };
  }
  static mapActions = { ...actions }
  render() {
    return (
      <div className={`profile-sign ${this.props.className || ''}`}>
        <div className="profile-sign__header">
          <div className="profile-sign__header--label">calendar</div>
        </div>
        <div className="profile-sign__switcher">
          <div className={
            `profile-sign__switcher--item ${this.props.activeForm === 'in' ? 'profile-sign__switcher-active' : ''}`
          } onClick={ this.switch('in') }>Sign in</div>
          <div className={
            `profile-sign__switcher--item ${this.props.activeForm === 'up' ? 'profile-sign__switcher-active' : ''}`
          } onClick={ this.switch('up') }>Sign up</div>
        </div>
        <Transition duration={300}
                    switch={this.props.activeForm}
                    className="sign-wrapper"
                    mode="out-in"
                    name="sign-fade">
          <ProfileSignin key="signin" case="in"/>
          <ProfileSignup key="signup" case="up"/>
          <ProfileForgot key="forgot" case="forgot"/>
        </Transition>
        <div className="profile-sign__footer">
          <div className="profile-sign__footer-main-row">
            <Transition duration={300}
                        switch={this.props.activeForm}
                        className="sign-wrapper"
                        mode="out-in"
                        name="sign-fade">
              <SubmitButton className="profile-sign__footer--confirm"
                            text="Sign in" key="signin" case="in"/>
              <SubmitButton className="profile-sign__footer--confirm"
                            text="Sign up" key="signup" case="up"/>
              <SubmitButton className="profile-sign__footer--confirm"
                            text="Submit" key="forgot" case="forgot"/>
            </Transition>
          </div>
          <div className="profile-sign__footer-social-row">
            <VkControl className="profile-sign__footer-social-row--vk" onClick={this.social('vk')}/>
            <GoogleControl className="profile-sign__footer-social-row--google" onClick={this.social('google')}/>
            <FbControl className="profile-sign__footer-social-row--fb" onClick={this.social('fb')}/>
          </div>
        </div>
      </div>
    );
  }
  switch(value) {
    return () => {
      this.context.router.history.pushSearch('sign', value);
    };
  }
  social(name) {
    return () => {
      auth.auth(name).then(() => {
        console.log('ЕЕЕ РОООКККК');
        auth.info().then(res => {
          console.log('profile', res);
          return auth.friends(res.id);
        }).then(res => {
          console.log('users', res);
          this.context.router.history.clear()
        });
      });
    };
  }
}

ProfileSign.contextTypes = {
  router: PropTypes.object.isRequired
}

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        { this.props.text }
      </div>
    );
  }
}

export default attachRouterRedux(ProfileSign);