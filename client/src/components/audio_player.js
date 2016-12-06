import React, { Component } from 'react';

import 'style/audio_player';

export default class AudioPlayer extends Component {
  render() {
    return (
      <div className="audio-player">
        <div className="progress-bar">
          <div className="progress-bar__outer">
            <div className="progress-bar__inner"></div>
          </div>
        </div>
      </div>
    );
  };
}
