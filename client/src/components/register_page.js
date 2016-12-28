import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { registerUser } from '../actions/index';

import 'style/auth';

class RegisterPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      reqUsername: '',
      reqPassword: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);;
  }

  handleSubmit(e) {
    console.log(this.props.auth);
    e.preventDefault();
    // TODO: use registerUser action
  }

  // Generalized handler for username/password
  handleChange(name, e) {
    // Work around to allow the string value of the variable name
    // to be the object key.
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-container">
        <Card className="card">
          <h2>Register</h2>
          <CardText>
            <TextField
              hintText='User'
              className='input-field'
              value={this.state.reqUsername}
              onChange={this.handleChange.bind(this, 'reqUsername')}
            />
            <TextField
              hintText='Password'
              type="password"
              className='input-field'
              value={this.state.reqPassword}
              onChange={this.handleChange.bind(this, 'reqPassword')}
            />
            <RaisedButton
              label="Register"
              primary={true}
              className="submit-form"
            />
          </CardText>
        </Card>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { registerUser })(RegisterPage);
