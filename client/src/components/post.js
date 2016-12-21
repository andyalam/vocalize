import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AudioPlayer from './audio_player';
import { base64ToBlob } from '../snippets/helpers';

import 'style/post';

class Post extends Component {
  constructor(props) {
    super();
    const { user, audio, date, upvotes, downvotes, blobbase64 } = props;
    this.state = {
      user,
      audio,
      date,
      upvotes,
      downvotes,
      blobbase64
    }
  }

  renderAudio() {
    const contentType = 'audio/ogg';
    const blob = base64ToBlob(this.state.blobbase64, contentType);
    const audioURL = window.URL.createObjectURL(blob);
    
    return (
      <audio controls src={audioURL}></audio>
    );
  }

  render() {
    const { user, audio, date, upvotes, downvotes } = this.state;
    return (
      <Card className="post">
        <CardHeader
          title={user}
          subtitle={date}
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
