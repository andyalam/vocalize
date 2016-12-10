import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AudioPlayer from './audio_player';

import 'style/post';

class Post extends Component {
  constructor(props) {
    super();
    const { user, audio, date, upvotes, downvotes } = props;
    this.state = {
      user,
      audio,
      date,
      upvotes,
      downvotes
    }
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
        <AudioPlayer />
      </Card>
    );
  }
}

export default Post;
