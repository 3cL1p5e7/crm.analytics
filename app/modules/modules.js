<style lang="sass">
  @import '~uikit/theme';
  .modules-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      height: 55px;
      background: $modules_header_color;

      display: flex;
      flex-direction: row;
      flex-grow: 0;
      flex-shrink: 0;

      a {
        display: flex;
        align-items: stretch;

        margin: 0 10px 0 10px;
      }
      .item {
        display: flex;
        align-items: center;

        border: .1rem solid red;
      }
    }
    &__links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      transition: all .5s ease;
    }
    &__modules {
      background-color: $modules_body_color;
      display: flex;
      flex-grow: 1;
      padding: 1rem;
    }
  }
</style>

import React, { Component } from 'react';
import { Link, Route, browserHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Calendar from './calendar/calendar.js';

export default class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      modules: {
        calendar: {
          id: 'calendar',
          name: 'Календарь',
          index: 0
        },
        settings: {
          id: 'settings',
          name: 'Настройки',
          index: 1
        },
        exit: {
          id: 'exit',
          name: 'Выход',
          index: 2
        }
      }
    };
  }
  renderModules() {
    const { modules } = this.state;
    const items = [];
    Object.keys(modules)
      .sort((a, b) => modules[a].index > modules[b].index)
      .forEach((key) => {
        items.push(
          <Link key={ key }
                to={`/${modules[key].id}`}
                style={{ textDecoration: 'none' }}
                >
            <div className="item"
                 onClick={this.goToLink(key)}>
                 {`${modules[key].name}`}
            </div>
          </Link>);
      });
    return items;
  }
  render() {
    return (
      <div className="modules-container">
        <div className="modules-container__header">
          <div className="modules-container__links"
               style={{ flexGrow: this.state.active ? 1 : 0 }}>
            { this.renderModules() }
          </div>
        </div>
        <div className="modules-container__modules">
          <Route path="/calendar" component={Calendar}/>
        </div>
      </div>
    );
  }
  goToLink(key) {
    return () => {
      this.setState({ active: key });
    };
  }
  componentDidMount() {
    console.log('mount');
    this.setState({
      active: this.context.router.route.location.pathname.replace('/', '')
    });
  }

  // componentWillUpdate() {
    
  //   const currentRoute = this.context.router.route.location.pathname.replace('/', '');
  //   console.log('update', currentRoute, this.state.active);
  //   if (this.state.active !== currentRoute)
  //     this.setState({
  //       active: currentRoute
  //     });
  // }
}
Modules.contextTypes = {
  router: PropTypes.object.isRequired
}
