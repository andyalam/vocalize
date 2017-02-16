import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/index';


// Basic logout, redirecting to this Component
// logs the user out and redirects to the homepage.
// This is used to simplify the Navbar component.
class Logout extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.logout();
  }

  render() {
    this.context.router.push('/');
    return null;
  }
}

export default connect(null, { logout })(Logout);
