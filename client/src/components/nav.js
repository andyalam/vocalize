import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import 'style/nav';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div className="navigation">
        <AppBar
          title="Vocalize"
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
          <Link
            to={'/'}
            onClick={this.handleToggle}
          >
            <MenuItem>Home</MenuItem>
          </Link>
          <Link
            to={'/upload'}
            onClick={this.handleToggle}
          >
            <MenuItem>Upload</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}
