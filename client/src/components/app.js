import React, { Component } from 'react';
import PostListing from './post_listing';

import AppBar from 'material-ui/AppBar';

import 'style/index';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Vocalize"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
