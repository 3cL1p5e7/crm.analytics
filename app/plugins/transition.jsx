<style lang="sass">
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import { matchPath } from 'react-router'


class Transition extends Component {
  active = null
  forceUpdate = null
  timeout = null
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    const result = this.active ? <div className={this.props.className || 'transition-wrapper'}>{this.active }</div> : null;
    console.log('render');
    return result;
  }
  componentWillUpdate(nextProps) {
    let newActive = null;
    console.log('will render');
    this.state.active;
    nextProps.children.some((child) => {
      if (!child.props.path)
        return false;
      const match = matchPath(nextProps.location.pathname, {
        path: child.props.path,
        exact: false,
        strict: false
      });
      if (match) {
        newActive = child;
      }
      return match;
    });

    if (this.active && newActive &&
        this.active.props.path !== newActive.props.path &&
        !this.forceUpdate) {
      this.forceUpdate = newActive;
    } else {
      if (!this.active && newActive)
        this.active = newActive;
      else if (this.forceUpdate) this.active = this.forceUpdate;
      else if (!newActive) this.active = null;
      this.forceUpdate = null;
    }
  }
  componentDidUpdate() {
    if (!this.forceUpdate)
      return;
    if (this.timeout)
      clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ active: !this.state.active });
    }, this.props.duration);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
}

export default attachRedux(Transition);
