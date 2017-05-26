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
        position: absolute;
        cursor: pointer;
        font-size: 20px;
        color: $modules-header-text-color;

        border: 2px solid $modules-header-text-color;
        border-radius: 15px;
        padding: 2px 8px 2px 8px;
      }
    }
  }

  .sign-fade-enter {
    opacity: 0;
  }
  .sign-fade-enter.sign-fade-enter-active {
    opacity: 1;
    transition: opacity .3s ease;
  }

  .sign-fade-leave {
    opacity: 1;
  }
  .sign-fade-leave.sign-fade-leave-active {
    opacity: 0;
    transition: opacity .3s ease;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from '../actions';

import { ProfileSignin, ProfileSignup, ProfileForgot } from './';
import { VkControl, FbControl, GoogleControl } from 'uikit/controls';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
      activeForm: store.profile.activeForm,
      user: store.profile.user,
    };
  }
  static mapActions = { ...actions }
  buttons() {
    switch (this.props.activeForm) {
      case 'in':
        return <SubmitButton className="profile-sign__footer--confirm"
          text="Sign in" key="signin" />;
      case 'up':
        return <SubmitButton className="profile-sign__footer--confirm"
          text="Sign up" key="signup"/>;
      case 'forgot':
        return <SubmitButton className="profile-sign__footer--confirm"
          text="Submit" key="forgot" />;
    }
  }
  form() {
    switch (this.props.activeForm) {
      case 'in':
        return <ProfileSignin key="signin" />
      case 'up':
        return <ProfileSignup key="signup" />
      case 'forgot':
        return <ProfileForgot key="signin" />
    }
  }
  render() {
    const buttons = this.buttons();
    const form = this.form();
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
        <CSSTransitionGroup className="sign-wrapper"
                            component="div"
                            transitionName="sign-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
          {form}
        </CSSTransitionGroup>
        <div className="profile-sign__footer">
          <div className="profile-sign__footer-main-row">
              <CSSTransitionGroup className="sign-wrapper"
                                  component="div"
                                  transitionName="sign-fade" 
                                  transitionAppear={true} 
                                  transitionAppearTimeout={300} 
                                  transitionEnterTimeout={300} 
                                  transitionLeaveTimeout={300}>
                {buttons}
              </CSSTransitionGroup>
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
        return auth.provider.info();
      }).then(res => {
        console.log('profile', res);
        this.props.login(res, name);
        auth.provider.events().then(events => {
          this.props.setProfileEvents(events, name);
          console.log('events', this.props.user);
        });
        return auth.provider.friends();
      }).then(res => {
        console.log('users', res);
        this.props.setFriends(res, name);
        this.context.router.history.clear()
        console.log(this.props.user);
      }).catch(err => {
        console.log(this.props.user);
        console.log(this.localization);
        console.error(err);
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