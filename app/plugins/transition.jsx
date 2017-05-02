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
  types = {
    'enter': 'leave',
    'enter-active': 'leave',
    'leave': 'enter',
    'leave-active': 'enter',
  }
  constructor(props) {
    super(props);
    this.state = {
      activator: false
    };
  }
  render() {
    return this.active ? <div className={this.props.className}
                              ref={(input) => { this.container = input; }}>{ this.active }</div> : null;
  }
  getActiveDomElement() {
    return this.container ? this.container.children[0] : null;
  }

  changeClassElement(classNameFrom = [], classNameTo) {
    const element = this.getActiveDomElement();
    if (!element)
      return;
    classNameFrom.forEach(name => element.classList.remove(name));
    if (classNameTo)
      element.classList.add(classNameTo);
  }
  changeClass(element, classNameFrom = [], classNameTo = '') {
    const filtered = (element.props.className || '').split(' ').filter((el) => el.length != 0 && classNameFrom.indexOf(el) === -1);
    const className = [...filtered, classNameTo].join(' ');
    return React.cloneElement(element, { className });
  }

  removeTransition(type) {
    this.transitionTimeout = setTimeout(() => {
      this.changeClassElement([
        `${this.props.transitionClass}-${type}`,
        `${this.props.transitionClass}-${type}-active`
      ]);
    }, this.props.duration);
  }
  setTransition(type, prop) {
    if (prop)
      return this.changeClass(prop, [
               `${this.props.transitionClass}-${this.types[type]}`,
               `${this.props.transitionClass}-${this.types[type]}-active`
             ],
             `${this.props.transitionClass}-${type}`);
    this.changeClassElement([
      `${this.props.transitionClass}-${this.types[type]}`,
      `${this.props.transitionClass}-${this.types[type]}-active`
    ], `${this.props.transitionClass}-${type}`);
  }
  activeWatcher(target, old) {
    if (!target && old) { // exit
      this.setTransition('leave-active');
      this.forceUpdate = {
        target: null,
        enabled: true
      };
    } else if (!old && target) { // enter
      this.active = target;
      this.active = this.setTransition('enter-active', this.active);
      this.forceUpdate = {
        target: null,
        enabled: false
      };
    } else if (target && old) { // switch
      if (old.props.path === target.props.path)
        return;
      this.active = this.setTransition('leave-active', this.active);
      // this.setTransition('leave-active');
      this.forceUpdate = {
        target: this.setTransition('enter-active', target),
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
    if (!target) {
      target = nextProps.children.find((child) => !child.props.path);
    }
    return target;
  }
  
  componentWillUpdate(nextProps) {
    if (this.forceUpdate.enabled) {
      this.active = this.forceUpdate.target;
      if (this.active)
        this.active = this.setTransition('enter-active', this.active);
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
        this.setTransition('enter');
        this.removeTransition('enter');
        return;
      }
      if (this.active) {
        this.setTransition('leave');
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
    }, 30);
  }

  componentWillMount() {
    this.active = this.setTransition('enter-active', this.getTargetComponent(this.props));
  }
  componentDidMount() {
    this.setTransition('enter');
    this.removeTransition('enter');
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
