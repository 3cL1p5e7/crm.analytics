<style lang="sass">
  @import '~uikit/theme';
  .modal-control {
    
  }
</style>

import React, { Component } from 'react';
import { attachRouterRedux } from 'store/utils';
import PropTypes from 'prop-types';

class ModalControl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-control">
        { this.props.children }
      </div>
    );
  }
}

export default attachRouterRedux(ModalControl);