import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import 'style/audio_player';

export default class AudioPlayer extends Component {
  render() {
    return (
      <div className="audio-player">
        <div className="play-button-wrapper">
          <div className="play-button"></div>
        </div>
        <LinearProgress mode="determinate" value={20} className="progress-bar"/>
      </div>
    );
  };
}
