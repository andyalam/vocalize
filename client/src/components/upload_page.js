import React, { Component } from 'react';

import Recorder from './recorder';
import Clips from './clips';

export default class UploadPage extends Component {
  render() {
    return (
      <div className="upload-page">
        <Recorder />
        <Clips />
      </div>
    )
  }
}
