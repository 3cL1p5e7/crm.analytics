<style lang="sass">
</style>

import React, { Component } from 'react';
import { attachRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';

import { matchPath } from 'react-router'


class Transition extends Component {
  active = null
  forceUpdate = {
    target: null,
    enabled: false
  }
  timeout = null
  transitionTimeout = null
  constructor(props) {
    super(props);
    this.state = {
      activator: false
    };
  }
  render() {
    console.log('render');
    return this.active ? <div className={this.props.className}>{ this.active }</div> : null;;
  }
  getActiveDomElement() {
    const root = document.querySelector(`.${this.props.className}`);
    return root ? root.children[0] : null;
  }
  changeClassElement(classNameFrom = '', classNameTo) {
    // setTimeout(() => {
      const element = this.getActiveDomElement();
      if (!element)
        return;
      element.classList.remove(classNameFrom);
      if (classNameTo)
        element.classList.add(classNameTo);
    // }, 1);
  }
  changeClass(element, classNameFrom = '', classNameTo = '') {
    const filtered = (element.props.className || '').split(' ').filter((el) => el.length != 0 && el !== classNameFrom);
    const className = [...filtered, classNameTo].join(' ');
    return React.cloneElement(element, { className });
  }
  activeWatcher(target, old) {
    if (!target && old) { // exit
      this.changeClassElement(null, `${this.props.transitionClass}-leave-active`);
      this.forceUpdate = {
        target: null,
        enabled: true
      };
    } else if (!old && target) { // enter
      this.active = target;
      this.active = this.changeClass(this.active, null, `${this.props.transitionClass}-enter-active`);
      this.forceUpdate = {
        target: null,
        enabled: false
      };
    } else if (target && old) { // switch
      if (old.props.path === target.props.path)
        return;
      this.changeClassElement(null, `${this.props.transitionClass}-leave-active`);
      this.forceUpdate = {
        target,
        enabled: true
      };
    }
  }
  getTargetComponent(nextProps) {
    let target = null;
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
    if (this.forceUpdate.enabled) {
      this.active = this.forceUpdate.target;
      if (this.active)
        this.active = this.changeClass(this.active, null, `${this.props.transitionClass}-enter-active`);
      this.forceUpdate = {
        target: null,
        enabled: false
      };
      return;
    }
    this.activeWatcher(this.getTargetComponent(nextProps), this.active);
  }
  componentDidUpdate() {
    setTimeout(() => {
      if (!this.forceUpdate.enabled) {
        this.changeClassElement(null, `${this.props.transitionClass}-enter`);
        this.transitionTimeout = setTimeout(() => {
          this.changeClassElement(`${this.props.transitionClass}-enter-active`);
          this.changeClassElement(`${this.props.transitionClass}-enter`);
        }, this.props.duration + 30);
        return;
      }
      if (this.active) { //) {
        this.changeClassElement(null, `${this.props.transitionClass}-leave`);
      }
        
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout);
      }
      this.timeout = setTimeout(() => {
        this.setState({ activator: !this.state.activator });
      }, this.props.duration + 30);
    }, 1);
  }
  componentWillMount() {
    this.active = this.getTargetComponent(this.props);
    this.changeClassElement(null, `${this.props.transitionClass}-enter-active`);
  }
  componentDidMount() {
    this.changeClassElement(null, `${this.props.transitionClass}-enter`);
    this.transitionTimeout = setTimeout(() => {
      this.changeClassElement(`${this.props.transitionClass}-enter-active`);
      this.changeClassElement(`${this.props.transitionClass}-enter`);
    }, this.props.duration + 30);
    
  }
  componentWillUnmount() {
     if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    }
  }
}

export default attachRedux(Transition);
