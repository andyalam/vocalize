import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createClip, getCategories } from '../actions/index';
import { decodeJWT } from '../snippets/helpers';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import 'style/recorder';

class Recorder extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor() {
    super();
    navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    const audioCtx = new (window.AudioContext || webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();

    this.state = {
      audioCtx: audioCtx,
      analyser: analyser,
      chunks: [],
      recording: false,
      recorderError: '',
      categoryOption: 0
    };
  }

  componentWillMount() {
    // prevent unauth users from accessing this page
    if (!this.props.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  componentWillUnmount() {
    // close AudioContext, otherwise hardware will still be bound
    // and cause issues long-term while using the app
    this.state.audioCtx.close();
  }

  draw = () => {
    var canvasCtx = this.state.canvas.getContext("2d");
    var dataArray = new Uint8Array(this.state.analyser.frequencyBinCount);
    var bufferLength = this.state.analyser.frequencyBinCount;
    const WIDTH = this.state.canvas.width;
    const HEIGHT = this.state.canvas.height;

    requestAnimationFrame(this.draw);

    this.state.analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = '#00bcd4';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#fff';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;


    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(this.state.canvas.width, this.state.canvas.height/2);
    canvasCtx.stroke();

  }

  visualize = (stream) => {
    var source = this.state.audioCtx.createMediaStreamSource(stream);
    this.state.analyser.fftSize = 2048;
    var bufferLength = this.state.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(this.state.analyser);
    //analyser.connect(this.state.audioCtx.destination);

    this.draw();
  }

  componentDidMount() {
    this.props.getCategories();

    this.setState({
      canvas: this.refs.canvas,
    });

    if (navigator.getUserMedia) {
      console.log('getUserMedia supported.');

      var constraints = { audio: true };

      var onSuccess = function(stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstop = this.mediaRecorderOnStop;
        mediaRecorder.ondataavailable = this.mediaRecorderOnDataAvailable;
        this.setState({ mediaRecorder });
        this.visualize(stream);
      }

      var onError = function(err) {
        console.log('The following error occured: ' + err);
        this.setState({
          recorderError: `Error: This is most likely caused by microphone permissions.
                          Ensure your browser has access to the device's mic.`
        });
      }

      navigator.getUserMedia(constraints, onSuccess.bind(this), onError);
    } else {
       console.log('getUserMedia not supported on your browser!');
    }
  }

  recordOnClick = () => {
    this.state.mediaRecorder.start();
    console.log(this.state.mediaRecorder.state);
    console.log("recorder started");

    this.setState({ recording: true });
  }

  stopOnClick = () => {
    this.state.mediaRecorder.stop();
    console.log(this.state.mediaRecorder.state);
    console.log("recorder stopped");

    // mediaRecorder.requestData();

    this.setState({ recording: false });
  }

  mediaRecorderOnStop = () => {
    console.log("data available after MediaRecorder.stop() called.");

    var clipName = prompt('Enter a name/description for your sound clip?','My unnamed clip');

    const blob = new Blob(this.state.chunks, { 'type' : 'audio/mpeg; codecs=opus' });
    console.log(blob);
    const { username } = this.props.auth;

    this.props.createClip(blob, clipName, username, this.props.auth.token);

    // reset chunks
    this.setState({
      chunks: []
    });

    console.log("recorder stopped");
  }

  mediaRecorderOnDataAvailable = (e) => {
    this.setState({
      chunks: [...this.state.chunks, e.data]
    })
  }

  closeDialog = () => {
    this.setState({
      recorderError: ''
    });
  }

  handleCategoryOptionChange = (event, index, categoryOption) => {
    this.setState({categoryOption});
  }

  renderCategoryoptions = () => {
    if (!this.props.categories) { return; }

    const menuItems = this.props.categories.map((category, i) => {
      return (
        <MenuItem
          key={category.category}
          className="select-field__item"
          value={i}
          primaryText={category.title}
        />
      );
    });

    return (
      <SelectField
        className="select-field"
        floatingLabelText="Currently uploading to Category"
        value={this.state.categoryOption}
        onChange={this.handleCategoryOptionChange}
      >
        {menuItems}
      </SelectField>
    );
  }

  render() {
    return (
      <section className="main-controls">
        <Dialog
          title="Recording Error"
          actions={
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.closeDialog}
            />
          }
          modal={false}
          open={Boolean(this.state.recorderError)}
          onRequestClose={this.closeDialog}
        >
          {this.state.recorderError}
        </Dialog>
        {this.renderCategoryoptions()}
        <canvas ref="canvas" className="visualizer"></canvas>
        <div id="buttons">
          <RaisedButton
            label="Record"
            className="record"
            onClick={this.recordOnClick}
            disabled={this.state.recording}
          />
          <RaisedButton
            label="Stop"
            className="stop"
            onClick={this.stopOnClick}
            disabled={!this.state.recording}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, categories: state.posts.categories };
}


export default connect(mapStateToProps, { createClip, getCategories })(Recorder);
