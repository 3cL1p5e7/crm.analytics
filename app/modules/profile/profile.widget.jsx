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
      position: relative;
      z-index: 1;
      
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

    &__info {
      position: relative;
      
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      margin: 10px 0 10px 0;
      z-index: 0;
    }
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

import * as actions from './actions';
import * as eventActions from '../events/actions';

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
      userid: store.profile.user ? store.profile.user.id : null,
      avatar: store.profile.user ? store.profile.user.avatar : null
    };
  }
  static mapActions = { ...actions, ...eventActions }
  render() {
    return (
      <div className={`profile-widget ${this.props.className || ''}`}>
        <div className="profile-widget__icon"
             onClick={this.iconClick()}>
          <svg className="profile-widget__icon--svg">
          {
            this.props.logged ? (
              <g>
                {!this.state.loaded && this.props.avatar ?
                  <use xlinkHref="#icon-hydro" className="icon-hydro--loading"/> : 
                  null
                }
                <image xlinkHref={this.props.avatar}
                      className="icon-avatar"
                      preserveAspectRatio="xMidYMid slice"
                      height="55" width="55"
                      ref={(image) => { this.image = image; }}/>
              </g>) :
              <use xlinkHref="#icon-hydro" className="icon-hydro"/>
          }
          </svg>
        </div>
        <div className="profile-widget__stats">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  iconClick() {
    return () => {
      if (!this.state.loaded) {
        this.props.login({
          id: 'boss',
          firstname: 'Boss',
          lastname: 'Big Russian',
          avatar: 'https://www.2do2go.ru/uploads/c799d11d6748abff308c893ea2f12bf5.jpg',
          groups: ['666', '667', '554'],
          events: ['serd', 'trip', 'paris', 'berlin', 'spain'],
          friends: {
            'ks': {
              id: 'ks',
              firstname: 'Ksenya'
            },
            'rm': {
              id: 'rm',
              firstname: 'Roman'
            },
            'vl': {
              id: 'vl',
              firstname: 'Valera'
            },
            'an': {
              id: 'an',
              firstname: 'Andrey'
            },
            'rt': {
              id: 'rt',
              firstname: 'Rita'
            },
            'al': {
              id: 'al',
              firstname: 'Alexandra'
            }
          }
        });
        setTimeout(() => {
          this.props.setEvents({
            events: {
              'serd': {
                id: 'serd',
                master: 'boss',
                title: 'Travel to Serd',
                from: new Date('07-06-2017'),
                to: new Date('07-12-2017')
              },
              'hello': {
                id: 'hello',
                master: 'ks',
                title: 'Hello world'
              },
              'trip': {
                id: 'trip',
                master: 'boss',
                title: 'EuropeTrip',
                description: 'Trip on the Europe... EEEE POOOKKK',
                from: new Date('07-15-2017'),
                to: new Date('07-30-2017'),
                children: ['paris', 'berlin', 'barcelona'],
                participants: ['boss', 'ks', 'rm', 'vl', 'an', 'rt', 'al']
              },
              'paris': {
                id: 'paris',
                master: 'and',
                title: 'FRANCE - Paris',
                description: 'Niggas. Third station. Paris',
                from: new Date('07-28-2017'),
                to: new Date('07-30-2017'),
                parent: 'trip',
                participants: ['ks', 'rm', 'vl', 'an', 'rt', 'al']
                // location
              },
              'berlin': {
                id: 'berlin',
                master: 'boss',
                title: 'GERMANY - Berlin',
                description: 'Second station. Berlin',
                from: new Date('07-15-2017'),
                to: new Date('07-18-2017'),
                parent: 'trip',
                participants: ['ks', 'rm', 'vl', 'an', 'rt', 'al']
                // location
              },
              'barcelona': {
                id: 'barcelona',
                master: 'boss',
                title: 'Beautiful country - Spain ',
                description: 'Aim of the tour',
                from: new Date('07-18-2017'),
                to: new Date('07-28-2017'),
                parent: 'trip',
                participants: ['ks', 'rm', 'vl', 'an', 'rt', 'al']
                // location
              },
            }
          });
        }, 500);
      }
    };
  }
  componentDidMount() {
    if (this.image) {
      this.image.addEventListener('load', () => this.setState({ loaded: true }));
    }
  }
}

export default attachRouterRedux(ProfileWidget);