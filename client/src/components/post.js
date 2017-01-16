import React, { Component } from 'react';
import { base64ToBlob } from '../snippets/helpers';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CommunicationCallMade from 'material-ui/svg-icons/communication/call-made';
import CommunicationCallReceived from 'material-ui/svg-icons/communication/call-received';

import 'style/post';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  renderAudio() {
    const contentType = 'audio/ogg';
    const blob = base64ToBlob(this.props.blobbase64, contentType);
    const audioURL = window.URL.createObjectURL(blob);

    return (
      <audio controls src={audioURL}></audio>
    );
  }

  upvoteOnClick = (e) => {
    console.log('upvotes');
  }

  downvoteOnClick = (e) => {
    console.log('downvote');
  }

  render() {
    const { user, audio, date, upvotes, downvotes, description, votes } = this.props;
    return (
      <Card className="post">
        <div className="post__left">
          <CommunicationCallMade
            className="upvote active"
            onClick={this.upvoteOnClick}
          />
          <Chip className="chip">{votes.length}</Chip>
          <CommunicationCallReceived
            className="downvote active"
            onClick={this.downvoteOnClick}
          />
        </div>
        <div className="post__right">
          <CardHeader
            title={description}
            subtitle={`Posted ${date} by ${user}`}
            //avatar="images/jsa-128.jpg"
          />
        </div>
        <div className="audio-player">
          {this.renderAudio()}
        </div>
      </Card>
    );
  }
}

export default Post;
