import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteClip, updateClipName } from '../actions/index';
import { base64ToBlob } from '../snippets/helpers';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

import 'style/clip';

class Clip extends Component {
  constructor(props) {
    super(props);
  }

  deleteButtonOnClick = () => {
    this.props.deleteClip(this.props.id);
  }

  editButtonOnClick = () => {
    const { clipName, id } = this.props;
    const newClipName = prompt('Enter a new description for your sound clip?');
    if(newClipName !== null && newClipName !== clipName) {
      this.props.updateClipName(id, newClipName);
    }
  }

  render() {
    const { clipName, blobbase64, description, date, votes } = this.props;
    const blob = base64ToBlob(blobbase64);
    const audioURL = window.URL.createObjectURL(blob);
    return (
      <Card className="clip">
        <CardHeader
          subtitle={date}
        />
        <Chip className="chip">{votes}</Chip>
        <CardText>
          <div onClick={this.clipLabelOnClick}>
            <h6>Description:</h6>
            <p>{description ? description: ""}</p>
          </div>
          <audio controls src={audioURL} />
          <div className="button-wrapper">
            <RaisedButton
              label="Edit description"
              primary={true}
              className="edit"
              onClick={this.editButtonOnClick}
            />
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
