import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clip from './clip';

class Clips extends Component {
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
  return { clips: state.clips };
}

export default connect(mapStateToProps, null)(Clips);
