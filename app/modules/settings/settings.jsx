<style lang="sass">
  .settings {
    display: flex;
    flex-grow: 1;
    background-color: yellow;

    opacity: 0;
    transition: opacity .3s ease;
  }
  .settings.show {
    opacity: 1;
  }
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import * as mainActions from 'modules/main/actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  static mapActions = {
    removeActive: mainActions.removeActive,
    setActive: mainActions.setActive
  }
  render() {
    const classList = ['settings'];
    if (this.state.show && !this.props.hiding)
      classList.push('show');
    return (
      <div className={classList.join(' ')}>
        This is HacTPouku
      </div>
    );
  }
  componentDidMount() {
    this.props.setActive('settings');
    setTimeout(() => {
      this.setState({ show: true });
    }, 1);
  }
  componentWillUnmount() {
    this.props.removeActive('settings');
  }
}
Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

export default attachRedux(Settings);
