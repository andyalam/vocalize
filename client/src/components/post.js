import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { base64ToBlob } from '../snippets/helpers';

import 'style/post';

class Post extends Component {
  constructor(props) {
    super();
  }

  renderAudio() {
    const contentType = 'audio/ogg';
    const blob = base64ToBlob(this.props.blobbase64, contentType);
    const audioURL = window.URL.createObjectURL(blob);

    return (
      <audio controls src={audioURL}></audio>
    );
  }

  render() {
    const { user, audio, date, upvotes, downvotes, description } = this.props;
    return (
      <Card className="post">
        <CardHeader
          title={description}
          subtitle={`Posted ${date} by ${user}`}
          //avatar="images/jsa-128.jpg"
        />
        <div className="audio-player">
          {this.renderAudio()}
        </div>
      </Card>
    );
  }
}

export default Post;
