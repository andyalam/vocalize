import React, { Component } from 'react';
import PostListing from './post_listing';
import Navigation from './nav';

import 'style/index';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container limiter">
          {this.props.children}
        </div>
      </div>
    );
  }
}
