import React, { Component } from 'react';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';

class Category extends Component {

  // TODO: take category from params, trigger action to fetch
  // posts under that key, populate the category listing

  render() {
    return (
      <div>
        <Subheader>{this.props.params.category}</Subheader>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { })(Category);
