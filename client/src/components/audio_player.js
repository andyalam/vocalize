import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import 'style/audio_player';

export default class AudioPlayer extends Component {
  render() {
    return (
      <div className="audio-player">
        <audio controls src="/vendor/test.wav"></audio>
      </div>
    );
  };
}
