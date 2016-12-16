import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteClip, updateClipName } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import 'style/clip';

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
      <Card className="clip">
        <CardText>
          <p onClick={this.clipLabelOnClick}>{clipName ? clipName: "Untitled"}</p>
          <audio controls src={audioURL} />
          <RaisedButton
            label="Delete"
            secondary={true}
            className="delete"
            onClick={this.deleteButtonOnClick}
          />
          <RaisedButton
            label="Submit"
            primary={true}
            className="submit"
          />
        </CardText>
      </Card>
    );
  }
}

export default connect(null, { deleteClip, updateClipName })(Clip);
