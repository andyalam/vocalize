import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getPostsOfCategory } from '../actions/index';
import Post from './post';

import Subheader from 'material-ui/Subheader';

import 'style/category';

class Category extends Component {
  componentDidMount() {
    this.props.getPostsOfCategory(this.props.params.category);
  }

  renderPosts = () => {
    if (!this.props.cPosts.length) {
      return (
        <div>
          <div className="category__empty-state">
            <p>No posts in this category yet, stay tuned!</p>
          </div>
        </div>
      )
    }

    return this.props.cPosts.map((post, index) => {
      return (
        <Post key={index} {...post} />
      );
    });
  }

  render() {
    return (
      <div className="category">
        <Subheader>
          <Link to="/categories">Back to all Categories</Link>
          <span className="category__title">
            {this.props.title}
            {this.props.cPosts.length ? '(' + this.props.cPosts.length + ')' : ''}
          </span>
        </Subheader>
        {this.renderPosts()}
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
