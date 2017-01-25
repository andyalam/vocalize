import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsOfCategory } from '../actions/index';

import Subheader from 'material-ui/Subheader';

class Category extends Component {
  componentDidMount() {
    this.props.getPostsOfCategory(this.props.params.category);
  }

  render() {
    return (
      <div>
        <Subheader>{this.props.params.category}</Subheader>
        <p>{this.props.cPosts ? this.props.cPosts.length : 'n'} {this.props.title}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  if (!state.posts.category) {
    return {};
  }

  const { cPosts, title } = state.posts.category;
  return { cPosts, title };
}

export default connect(mapStateToProps, { getPostsOfCategory})(Category);
