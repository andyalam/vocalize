import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategories } from '../actions/index';

import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import 'style/categories';


class Categories extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  renderTiles() {
    if (!this.props.categories) {
      return <div>No Categories yet, stay tuned!</div>
    }

    return this.props.categories.map((tile, i) => (
      <Link
        to={`/categories/${tile.category}`}
        key={i}
      >
        <GridTile
          className={`tile ${tile.category}`}
          title={tile.title}
        >
        </GridTile>
      </Link>
    ))
  }

  render() {
    return (
      <div className='categories-listing'>
        <GridList
          cellHeight={180}
        >
          <Subheader>Categories</Subheader>
          {this.renderTiles()}
        </GridList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.posts.categories }
}

export default connect(mapStateToProps, { getCategories })(Categories);
