import React, { Component } from 'react';
import PostListing from './post_listing';

import 'style/index';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
