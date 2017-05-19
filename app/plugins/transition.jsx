<style lang="sass">
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import { Router, Route } from 'react-router';
import createFragment from 'react-addons-create-fragment';
import PropTypes from 'prop-types';

import { matchPath } from 'react-router'


class Transition extends Component {
  active = {
    next: null,
    previous: null
  }
  forceUpdate = {
    target: null,
    enabled: false,
    released: true
  }
  timeout = null
  transitionTimeout = []
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
    if (!this.active.next)
      return null;
    if (this.isOutIn)
      return <div className={this.props.className} onClick={this.props.onClick}
        ref={(input) => { this.container = input; }}>{this.active.next}</div>;
    return <div className={this.props.className} onClick={this.props.onClick}
      ref={(input) => { this.container = input; }}>{[this.active.previous, this.active.next]}</div>;
  }
  get isOutIn() {
    return this.props.mode === 'out-in';
  }
  get byRouter() {
    return Boolean(this.props.router);
  }
  param(child) {
    return child.props.case;
  }
  match(child, nextProps) {
    if (this.byRouter) {
      if (!child.props.case)
        return false;
      const match = matchPath(nextProps.location.pathname, {
        path: child.props.case,
        exact: false,
        strict: false
      });
      return match;
    } else {
      return nextProps.switch === child.props.case;
    }
  }
  getActiveDomElement(index) {
    return this.container ? this.container.children[index] : null;
  }

  checkClass(child, name) {
    if (!child)
      return false;
    const classes = (child.props.className || '').split(' ');
    const filtered = classes.filter((el) => el.includes(`${this.props.name}-${name}`));
    return filtered.length !== 0;
  }
  changeClassElement(classNameFrom = [], classNameTo, index = 0, child) {
    if (child) {
      const filtered = (child.props.className || '').split(' ').filter((el) => classNameFrom.indexOf(el) === -1);
      const className = [...filtered, classNameTo].join(' ');
      return React.cloneElement(child, { className });
    }
    else {
      const element = this.getActiveDomElement(index);
      if (!element)
        return;
      classNameFrom.forEach(name => element.classList.remove(name));
      if (classNameTo)
        element.classList.add(classNameTo);
    }
  }

  removeTransition(type, index = 0, remove = false) {
    this.transitionTimeout[index] = setTimeout(() => {
      if (remove) {
        this.active[remove] = null;
        return;
      }
      this.changeClassElement([
        `${this.props.name}-${type}`,
        `${this.props.name}-${type}-active`
      ], index);
    }, this.props.duration);
  }
  setTransition(type, child, index) {
    return this.changeClassElement([
      `${this.props.name}-${this.types[type]}`,
      `${this.props.name}-${this.types[type]}-active`
    ], `${this.props.name}-${type}`, index, child);
  }
  activeWatcher(target, old) {
    if (!target && old) { // exit
      this.active.previous = null;
      this.active.next = this.setTransition('leave-active', old, 0);
      this.setTransition('leave-active', null, 0);
      this.forceUpdate = {
        target: null,
        exit: true,
        enabled: true,
        released: false
      };
    } else if (!old && target) { // enter
      this.active.next = this.setTransition('enter-active', target);
      this.forceUpdate = {
        target: null,
        enabled: false,
        released: true
      };
    } else if (target && old) { // switch
      if (this.param(old) === this.param(target)) { // fast switch
        if (!this.active.previous && this.checkClass(old, 'leave')) {
          this.active.next = this.setTransition('enter-active', old);
          this.forceUpdate = {
            target: null,
            enabled: false,
            released: false
          };
        }
        return;
      }
      if (this.isOutIn) {
        this.active.next = this.setTransition('leave-active', old);
        this.forceUpdate = {
          target: this.setTransition('enter-active', target), // target
          enabled: true,
          released: false
        };
      } else {
        this.forceUpdate = {
          target: null,
          enabled: true,
          released: false
        };
        this.active.previous = this.setTransition('leave-active', old);
        this.active.next = this.setTransition('enter-active', target);
      }
    }
  }

  getChildren(children) {
    if (!children)
      return [];
    return Array.isArray(children) ? children : [children];
  }

  getTargetComponent(nextProps) {
    let target = null;
    this.getChildren(nextProps.children).some((child) => {
      const result = this.match(child, nextProps);
      if (result)
        target = child;
      return result;
    });
    if (!target)
      target = this.getChildren(nextProps.children).find((child) => {
        const param = this.param(child);
        return param === null || typeof param === 'undefined';
      });
    return target;
  }
  
  componentWillUpdate(nextProps) {
    if (this.forceUpdate.enabled && this.forceUpdate.released) {
      if (this.forceUpdate.exit) {
        this.active.previous = null;
        this.active.next = null;
      } else if (!this.isOutIn)
        this.active.previous = null;
      else this.active.next = this.forceUpdate.target;

      this.forceUpdate = {
        target: null,
        enabled: false,
        released: true
      };
      return;
    }
    this.activeWatcher(this.getTargetComponent(nextProps), this.active.next);
  }
  componentDidUpdate() {
    setTimeout(() => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.transitionTimeout[0]) {
        clearTimeout(this.transitionTimeout[0]);
        this.transitionTimeout[0] = null
      }
      if (this.transitionTimeout[1]) {
        clearTimeout(this.transitionTimeout[1]);
        this.transitionTimeout[1] = null
      }

      if (!this.forceUpdate.enabled) {
        this.setTransition('enter', 0);
        this.removeTransition('enter', 0);
        return;
      }
      if (this.active.next) {
        this.setTransition('leave', null, 0);
        if (!this.isOutIn) {
          this.setTransition('enter', null, 1);
          this.removeTransition('enter', 1);
          this.removeTransition('leave', 0, 'previous');
        }
      }
      
      if (this.forceUpdate.enabled)
        this.forceUpdate.released = false;
      else this.forceUpdate.released = true;
      this.timeout = setTimeout(() => {
        this.forceUpdate.released = true;
        this.setState({ activator: !this.state.activator });
      }, this.props.duration + 30);
    }, 30);
  }

  componentWillMount() {
    this.active.next = this.setTransition('enter-active', this.getTargetComponent(this.props));
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
     if (this.transitionTimeout[0]) {
       clearTimeout(this.transitionTimeout[0]);
       this.transitionTimeout[0] = null
     }
     if (this.transitionTimeout[1]) {
       clearTimeout(this.transitionTimeout[1]);
       this.transitionTimeout[1] = null
     }
  }
}

export default attachRouterRedux(Transition);
