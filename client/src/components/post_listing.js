import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';

class PostListing extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if (!this.props.posts.length) {
      return (
        <div>No posts yet! Stay tuned.</div>
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
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts } )(PostListing);
