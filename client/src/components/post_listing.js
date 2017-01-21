import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';
import CircularProgress from 'material-ui/CircularProgress';

import 'style/post_listing';

class PostListing extends Component {
  componentDidMount() {
    const { username } = this.props.auth;
    this.props.fetchPosts(username);
  }

  renderPosts() {
    if (!this.props.posts.length) {
      return (
        <div className="spinner-holder">
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    return this.props.posts.map((post, index) => {
      return (
        <Post key={index} {...post} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts } )(PostListing);
