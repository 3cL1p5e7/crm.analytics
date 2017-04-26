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
      activator: false
    };
  }
  render() {
    const result = this.active ? <div className={this.props.className || 'transition-wrapper'}>{this.active }</div> : null;
    console.log('render');
    return result;
  }
  activeWatcher(target, old) {
    if (old && target &&
        old.props.path !== target.props.path &&
        !this.forceUpdate) {
      this.forceUpdate = target;
    } else {
      if (!old && target)
        this.active = target;
      else if (!target) this.active = null;
      else if (this.forceUpdate) this.active = this.forceUpdate;
      this.forceUpdate = null;
    }
  }
  getTargetComponent(nextProps) {
    let target = null;
    console.log('will render');
    nextProps.children.some((child) => {
      if (!child.props.path)
        return false;
      const match = matchPath(nextProps.location.pathname, {
        path: child.props.path,
        exact: false,
        strict: false
      });
      if (match) {
        target = child;
      }
      return match;
    });
    return target;
  }
  componentWillUpdate(nextProps) {
    this.activeWatcher(this.getTargetComponent(nextProps), this.active);
  }
  componentWillMount() {
    this.active = this.getTargetComponent(this.props);
  }
  componentDidUpdate() {
    if (!this.forceUpdate)
      return;
    if (this.timeout)
      clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ activator: !this.state.activator });
    }, this.props.duration);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
}

export default attachRedux(Transition);
