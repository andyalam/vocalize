import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'style/auth';

export default class RegisterPage extends Component {
  render() {
    return (
      <div className="auth-container">
        <Card className="card">
          <h2>Register</h2>
          <CardText>
            <TextField
              hintText='User'
              className='input-field'
            />
            <TextField
              hintText='Password'
              type="password"
              className='input-field'
            />
            <RaisedButton
              label="Register"
              primary={true}
              className="submit-form"
            />
          </CardText>
        </Card>
      </div>
    );
  }
}
