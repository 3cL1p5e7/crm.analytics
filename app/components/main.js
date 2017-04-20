const css = <style>
  .app {
    background: steelblue;
    color: white;
  }
</style>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Main extends Component {
  render() {
    return (
      <div className="app">
        <h1 >Hello mazafaka</h1>
      </div>
    );
  }
}
Main.contextTypes = {
  router: PropTypes.object.isRequired
}
