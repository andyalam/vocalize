import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';

class PostListing extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log('props', this.props);
    return this.props.posts.map((post) => {
      return (
        <div key={post.user}>
          {post.user}
        </div>
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
  //console.log('redux state:', state);
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts } )(PostListing);
