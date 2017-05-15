<style lang="sass">
  @import '~uikit/theme';

  @-webkit-keyframes hydro {
    0%   { transform: rotate(45deg); }
    10% { transform: rotate(405deg); }
    100% { transform: rotate(405deg); }
  }
  @-webkit-keyframes hydro-loading {
    0%   { transform: rotate(45deg); }
    100% { transform: rotate(405deg); }
  }

  .profile-widget {
    display: flex;

    overflow: hidden;

    border-bottom-left-radius: $header-radius;

    &__icon {
      border-top-right-radius: $header-radius;
      overflow: hidden;

      &:hover {
      }
      &--svg {
        width: $header-height;
        height: $header-height;

        fill: $modules-header-text-color;

        .icon-hydro {
          transform-origin: 27px 27px;
          transform: rotate(45deg);
          
          animation: hydro 10s infinite;
          animation-timing-function: ease;
          animation-delay: 3s;
          animation-fill-mode: forwards;
          &--loading {
            transform-origin: 27px 27px;
            transform: rotate(45deg);

            animation: hydro-loading 1s infinite;
            animation-timing-function: linear;
          }
        }
      }
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';

class ProfileWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  static mapState(store) {
    return {
      logged: store.profile.logged,
      avatar: store.profile.user.avatar
    };
  }
  render() {
    return (
      <div className={`profile-widget ${this.props.className || ''}`}>
        <div className="profile-widget__icon">
          <svg className="profile-widget__icon--svg">
          {
            this.props.logged ? (<g>
                                    { !this.state.loaded ? <use xlinkHref="#icon-hydro" className="icon-hydro--loading"/> : null }
                                    <image xlinkHref={this.props.avatar}
                                          className="icon-avatar"
                                          preserveAspectRatio="xMidYMid slice"
                                          height="55" width="55"
                                          ref={(image) => { this.image = image; }}/>
                                </g>) :
                                (<use xlinkHref="#icon-hydro" className="icon-hydro"/>)
          }
          </svg>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.image) {
      this.image.addEventListener('load', () => this.setState({ loaded: true }));
    }
  }
}

export default attachRouterRedux(ProfileWidget);