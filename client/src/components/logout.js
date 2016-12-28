import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/index';

class Logout extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    this.props.logout();
    this.context.router.push('/');
  }
}

export default connect(null, { logout })(Logout);
