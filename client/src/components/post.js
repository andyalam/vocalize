import React, { Component } from 'react';
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
      <div className="post">
        <div className="row">
          <div className="col-xs-4 info">
            <h5 className="post__user">{user}</h5>
            <h6 className="post__date">{date}</h6>
          </div>
          <div className="col-xs-8 audio-container">
            <AudioPlayer />
          </div>
          <div className="post__upvotes">
            <div className="up">
              <i className="fa fa-arrow-up"></i>
            </div>
            <div className="down">
              <i className="fa fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
