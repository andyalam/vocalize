import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import 'style/nav';

class Navigation extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  goToHome = () => this.context.router.push('/');

  render() {
    let links = [
      { text: 'Explore', url: '/'},
      { text: 'Categories', url: '/categories' }
    ];

    if (!this.props.auth.isAuthenticated) {
      links.push({ text: 'Register', url: '/register' },
                 { text: 'Login', url: '/login' });
    } else {
      links.push({ text: 'Upload', url: '/upload'},
                 { text: 'Logout', url: '/logout' })
    }

    const linkElements = links.map((link, index) => {
      return (
        <Link
          to={link.url}
          onClick={this.handleToggle}
          key={index}
        >
          <MenuItem>{link.text}</MenuItem>
        </Link>
      )
    });

    return (
      <div className="navigation">
        <AppBar
          title={<span className="logo">Vocalize</span>}
          onTitleTouchTap={this.goToHome}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem
            className="close-container"
            onClick={this.handleToggle}
          >
            <IconButton><NavigationClose /></IconButton>
          </MenuItem>
          {linkElements}
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, null)(Navigation);
