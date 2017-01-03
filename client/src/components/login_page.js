import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { loginUser } from '../actions/index';

import 'style/auth';

class LoginPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    // separate from redux store user/pass,
    // only used for controlled inputs in this component
    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);;
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser({
      email: this.state.username,
      password: this.state.password
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
      return null;
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-container">
        <Card className="card">
          <h2>Login</h2>
          <CardText>
            <TextField
              hintText='Username'
              className='input-field'
              value={this.state.username}
              onChange={this.handleChange.bind(this, 'username')}
            />
            <TextField
              hintText='Password'
              type="password"
              className='input-field'
              value={this.state.password}
              onChange={this.handleChange.bind(this, 'password')}
            />
            { this.props.auth.errorMessage &&
              <div className="error-message">{ this.props.auth.errorMessage }</div>
            }
            <RaisedButton
              label="Login"
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
  console.log(state.auth);
  return { auth: state.auth };
}

export default connect(mapStateToProps, { loginUser })(LoginPage);
