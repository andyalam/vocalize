import axios from 'axios';
import { guid, blobToBase64 } from '../snippets/helpers';

// auth
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
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
  const login = axios.post(`${API}/login`, creds)
                  .catch(() => {
                    return {
                      type: LOGIN_FAILURE,
                    };
                  })

  return {
    type: LOGIN_REQUEST,
    payload: login
  };
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
