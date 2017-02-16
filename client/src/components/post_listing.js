import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';
import {
  CircularProgress, SelectField, MenuItem
} from 'material-ui';

import 'style/post_listing';

class PostListing extends Component {

  state = {
    sortSelected: 0,
    sortOptions: [{
      key: "new",
      title: "Newest"
    }, {
      key: "top",
      title: "Top"
    }]
  }

  componentDidMount() {
    const { username } = this.props.auth;
    this.props.fetchPosts(username);
  }

  handleSortOptionChange(event, index, sortSelected) {
    this.setState({ sortSelected });
  }

  renderSortOptions() {
    const menuItems = this.state.sortOptions.map((option, i) => {
      return (
        <MenuItem
          key={option.key}
          className="select-field__item"
          value={i}
          primaryText={option.title}
        />
      );
    });

    return (
      <div className="select-field__holder">
        <SelectField
          className="select-field"
          floatingLabelText="Sorted By"
          value={this.state.sortSelected}
          onChange={this.handleSortOptionChange.bind(this)}
        >
          {menuItems}
        </SelectField>
      </div>
    );
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
      <div className="post-listing">
        {this.renderSortOptions()}
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts } )(PostListing);
