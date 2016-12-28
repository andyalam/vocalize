import axios from 'axios';
import { guid, blobToBase64 } from '../snippets/helpers';

// auth
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const UPDATE_CLIP_NAME = 'UPDATE_CLIP_NAME';

const API = 'http://localhost:3000/api';


function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}


function receiveLogin(user) {
  console.log(user.data.token);
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.data.token
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
      .then((response) => {
        dispatch(receiveLogin(response));
      })
      .catch((response) => {
        dispatch(loginError('oops'));
      });
  };
}


function receiveRegister(creds) {

}

function registerError(err) {

}

export function registerUser(creds) {
  return dispatch => {
    axios.post(`${API}/register`, creds)
      .then((response) => {
        dispatch(receiveRegister(response));
      })
      .catch((response) => {
        dispatch(registerError('Invalid'));
      })
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}


export function fetchPosts() {
  const posts = axios.get(`${API}/posts`);

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}


export function createClip(blob, clipName) {
  blobToBase64(blob, (base64) => {
    const payload = {
      payload: {
        blob: base64,
        clipName
      }
    };
    const request = axios.post(`${API}/posts`, payload);
  });

  return {
    type: CREATE_CLIP,
    id: guid(),
    clipName,
    blob
  }
}


export function deleteClip(id) {
  return {
    type: DELETE_CLIP,
    id
  }
}


export function updateClipName(id, newName) {
  return {
    type: UPDATE_CLIP_NAME,
    id,
    newName
  }
}
