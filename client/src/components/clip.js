import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteClip, updateClipName } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { base64ToBlob } from '../snippets/helpers';

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
    const newClipName = prompt('Enter a new description for your sound clip?');
    if(newClipName !== null && newClipName !== clipName) {
      this.props.updateClipName(id, newClipName);
    }
  }

  render() {
    const { clipName, blobbase64, description, date } = this.props;
    const blob = base64ToBlob(blobbase64);
    const audioURL = window.URL.createObjectURL(blob);
    return (
      <Card className="clip">
        <CardHeader
          subtitle={date}
        />
        <CardText>
          <div onClick={this.clipLabelOnClick}>
            <h6>Description: <small>(tap to update)</small></h6>
            <p>{description ? description: ""}</p>
          </div>
          <audio controls src={audioURL} />
          <div className="button-wrapper">
            <RaisedButton
              label="Delete"
              secondary={true}
              className="delete"
              onClick={this.deleteButtonOnClick}
            />
          </div>
        </CardText>
      </Card>
    );
  }
}

export default connect(null, { deleteClip, updateClipName })(Clip);
