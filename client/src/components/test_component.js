import React, { Component } from 'react';

export default class TestComponent extends Component {
  render() {
    return (
      <form ref='uploadForm'
          id='uploadForm'
          action='http://localhost:3000/api/posts'
          method='post'
          encType="multipart/form-data">
              <input type="file" name="recording" />
              <input type='submit' value='Upload!' />
      </form>
    );
  }
}
