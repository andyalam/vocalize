import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import Clip from './clip';
import { fetchClips } from '../actions/index';
import { decodeJWT } from '../snippets/helpers';

class Clips extends Component {
  componentDidMount() {
    const { username } = decodeJWT(this.props.auth.token);
    this.props.fetchClips(username);
  }

  render() {
    if (!this.props.clips.length) {
      console.log('here');
      return (
        <div className="spinner-holder">
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    const clips = this.props.clips.map((clip, index) => {
      return (
        <Clip key={index} {...clip}/>
      );
    });

    return (
      <section className="sound-clips">
        {clips}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    clips: state.clips
  };
}

export default connect(mapStateToProps, { fetchClips })(Clips);
