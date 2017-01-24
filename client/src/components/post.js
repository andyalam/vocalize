import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { voteOnClip } from '../actions/index';
import { base64ToBlob } from '../snippets/helpers';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
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
    const { voteOnClip, id } = this.props;
    voteOnClip(id, true);
  }

  downvoteOnClick = (e) => {
    const { voteOnClip, id } = this.props;
    voteOnClip(id, false);
  }

  render() {
    const {
      user,
      audio,
      date,
      upvotes,
      downvotes,
      description,
      votes,
      voteHistory,
      category
    } = this.props;
    let upvoted = 0;
    let downvoted = 0;
    if (voteHistory) {
      if (voteHistory.positive.toString() === 'true') {
        upvoted = 1;
      } else if (voteHistory.positive.toString() === 'false') {
        downvoted = 1;
      }
    }

    return (
      <Card className="post">
        <Link to={`/categories/${category.category}`}>
          <Chip className="category">
            {category.title}
          </Chip>
        </Link>
        <div className="post__left">
          <CommunicationCallMade
            className={`upvote active ${upvoted ? 'upvoted' : ''}`}
            onClick={this.upvoteOnClick}
          />
          <Chip className="chip">{votes}</Chip>
          <CommunicationCallReceived
            className={`downvote active ${downvoted ? 'downvoted' : ''}`}
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

export default connect(null, { voteOnClip })(Post);
