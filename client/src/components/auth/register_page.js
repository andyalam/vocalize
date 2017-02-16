import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { registerUser } from '../../actions/index';

import 'style/auth';

class RegisterPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      reqUsername: '',
      reqEmail: '',
      reqPassword1: '',
      reqPassword2: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { reqUsername, reqEmail, reqPassword1, reqPassword2 } = this.state;

    if (reqPassword1 !== reqPassword2) {
      this.setState({
        errror: 'Passwords do not match'
      });
    }

    this.props.registerUser({
      name: reqUsername,
      email: reqEmail,
      password: reqPassword1
    });
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
    if (this.props.auth.isAuthenticated) {
      this.context.router.push('/');
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-container">
        <Card className="card">
          <h2>Register</h2>
          <CardText>
            <TextField
              floatingLabelText='Username'
              className='input-field'
              value={this.state.reqUsername}
              onChange={this.handleChange.bind(this, 'reqUsername')}
            />
            <TextField
              floatingLabelText='Email'
              className='input-field'
              value={this.state.reqEmail}
              onChange={this.handleChange.bind(this, 'reqEmail')}
            />
            <TextField
              floatingLabelText='Enter Password'
              type="password"
              className='input-field'
              value={this.state.reqPassword1}
              onChange={this.handleChange.bind(this, 'reqPassword1')}
            />
            <TextField
              floatingLabelText='Repeat Password'
              type="password"
              className='input-field'
              value={this.state.reqPassword2}
              onChange={this.handleChange.bind(this, 'reqPassword2')}
            />
            { this.props.auth.errorMessage &&
              <div className="error-message">{ this.props.auth.errorMessage }</div>
            }
            <RaisedButton
              label="Register"
              primary={true}
              className="submit-form"
              type="submit"
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
