import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createClip } from '../actions/index';

class Recorder extends Component {
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
      chunks: []
    }

    this.draw = this.draw.bind(this);
    this.visualize = this.visualize.bind(this);
    this.recordOnClick = this.recordOnClick.bind(this);
    this.stopOnClick = this.stopOnClick.bind(this);
    this.mediaRecorderOnStop = this.mediaRecorderOnStop.bind(this);
    this.mediaRecorderOnDataAvailable = this.mediaRecorderOnDataAvailable.bind(this);
  }

  draw() {
    var canvasCtx = this.state.canvas.getContext("2d");
    var dataArray = new Uint8Array(this.state.analyser.frequencyBinCount);
    var bufferLength = this.state.analyser.frequencyBinCount;
    const WIDTH = this.state.canvas.width;
    const HEIGHT = this.state.canvas.height;

    requestAnimationFrame(this.draw);

    this.state.analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

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

  visualize(stream) {
    var source = this.state.audioCtx.createMediaStreamSource(stream);
    this.state.analyser.fftSize = 2048;
    var bufferLength = this.state.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(this.state.analyser);
    //analyser.connect(this.state.audioCtx.destination);

    this.draw();
  }

  componentDidMount() {
    this.setState({
      canvas: this.refs.canvas
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
      }

      navigator.getUserMedia(constraints, onSuccess.bind(this), onError);
    } else {
       console.log('getUserMedia not supported on your browser!');
    }
  }

  recordOnClick() {
    this.state.mediaRecorder.start();
    console.log(this.state.mediaRecorder.state);
    console.log("recorder started");
    this.refs.record.style.background = "red";

    this.refs.stop.disabled = false;
    this.refs.record.disabled = true;
  }

  stopOnClick() {
    this.state.mediaRecorder.stop();
    console.log(this.state.mediaRecorder.state);
    console.log("recorder stopped");
    this.refs.record.style.background = "";
    this.refs.record.style.color = "";
    // mediaRecorder.requestData();

    this.refs.stop.disabled = true;
    this.refs.record.disabled = false;
  }

  mediaRecorderOnStop() {
    console.log("data available after MediaRecorder.stop() called.");

    var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

    const blob = new Blob(this.state.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    this.props.createClip(blob, clipName);

    // reset chunks
    this.setState({
      chunks: []
    });

    console.log("recorder stopped");
  }

  mediaRecorderOnDataAvailable(e) {
    this.setState({
      chunks: [...this.state.chunks, e.data]
    })
  }

  render() {
    return (
      <section className="main-controls">
        <canvas ref="canvas" className="visualizer"></canvas>
        <div id="buttons">
          <button ref="record" className="record" onClick={this.recordOnClick} >Record</button>
          <button ref="stop" className="stop" onClick={this.stopOnClick} >Stop</button>
        </div>
        <section ref="soundClips">

        </section>
      </section>
    );
  }
}


export default connect(null, { createClip })(Recorder);
