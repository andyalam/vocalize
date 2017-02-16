import axios from 'axios';
import API from './config';
import { decodeJWT } from '../snippets/helpers';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function receiveLogin(req) {
  const { username, email } = decodeJWT(req.data.token);

  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: req.data.token,
    username,
    email
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
  return dispatch => {
    axios.post(`${API}/login`, creds)
      .then(response => {
        dispatch(receiveLogin(response));
      })
      .catch(response => {
        dispatch(loginError('oops'));
      });
  };
}


function receiveRegister(req) {
  const { username, email } = decodeJWT(req.data.token);

  return {
    type: REGISTER_SUCCESS,
    id_token: req.data.token,
    username,
    email
  }
}

function registerError(err) {
  return {
    type: REGISTER_FAILURE,
    errorMessage: err.toString()
  }
}

export function registerUser(creds) {
  return dispatch => {
    axios.post(`${API}/register`, creds)
      .then((response) => {
        dispatch(receiveRegister(response));
      })
      .catch((response) => {
        dispatch(registerError(response));
      })
  }
}


export function logout() {
  return {
    type: LOGOUT
  }
}
