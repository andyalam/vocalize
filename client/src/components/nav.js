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
    const links = [
      { text: 'Home', url: '/'},
      { text: 'Upload', url: '/upload'},
      { text: 'Test area', url: '/testarea'}
    ];
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
          {linkElements}
        </Drawer>
      </div>
    );
  }
}
