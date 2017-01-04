import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clip from './clip';
import { fetchClips } from '../actions/index';
import { decodeJWT } from '../snippets/helpers';

class Clips extends Component {
  componentDidMount() {
    const { username } = decodeJWT(this.props.auth.token);
    this.props.fetchClips();
  }

  render() {
    const clips = this.props.clips.map(clip => {
      return (
        <Clip key={clip.id} {...clip}/>
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
