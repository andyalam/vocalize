import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteClip, updateClipName } from '../actions/index';

class Clip extends Component {
  constructor() {
    super();
    this.deleteButtonOnClick = this.deleteButtonOnClick.bind(this);
    this.clipLabelOnClick = this.clipLabelOnClick.bind(this);
  }

  deleteButtonOnClick() {
    this.props.deleteClip(this.props.id);
  }

  clipLabelOnClick() {
    const { clipName, id } = this.props;
    const newClipName = prompt('Enter a new name for your sound clip?');
    if(newClipName !== null && newClipName !== clipName) {
      this.props.updateClipName(id, newClipName);
    }
  }

  render() {
    const { blob, clipName } = this.props;
    const audioURL = window.URL.createObjectURL(blob);
    return (
      <article className="clip">
        <audio controls src={audioURL} />
        <p onClick={this.clipLabelOnClick}>{clipName}</p>
        <button className="delete" onClick={this.deleteButtonOnClick}>Delete</button>
      </article>
    );
  }
}

export default connect(null, { deleteClip, updateClipName })(Clip);
