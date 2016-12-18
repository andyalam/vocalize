import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Dropdown = () => {
  return (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Send feedback" />
      <MenuItem primaryText="Settings" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" />
    </IconMenu>
  )
}

export default class Navigation extends Component {
  componentDidMount() {
    window.appbar = this.refs.appbar1;
  }
  render() {
    return (
      <AppBar
        title="Vocalize"
        ref="appbar1"
        iconElementLeft={<Dropdown />}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}
