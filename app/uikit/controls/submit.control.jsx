<style lang="sass">
  .submit-control {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`submit-control ${this.props.className}`}>
        { this.props.text }
      </div>
    );
  }
}
export default attachRouterRedux(SubmitButton);