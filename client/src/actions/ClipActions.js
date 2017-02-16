import axios from 'axios';
import API from './config';
import { blobToBase64 } from '../snippets/helpers';

/*
Posts and Clips are essentially the same except that:
1) Posts are considered public
2) Clips can only be accessed by the person who recorded/created them.
*/

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const UPDATE_CLIP_NAME = 'UPDATE_CLIP_NAME';
export const FETCH_CLIPS = 'FETCH_CLIPS';
export const CLIP_UPLOAD_FAILED = 'CLIP_UPLOAD_FAILED';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS_OF_CATEGORY = 'FETCH_POSTS_OF_CATEGORY';

export function fetchPosts(user = '') {
  const posts = axios.get(`${API}/posts/${user}`);

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}


function createClipFail(response) {
  return {
    type: CLIP_UPLOAD_FAILED
  };
}

export function createClip(blob, clipName, username, token, category) {
  return dispatch => {
    blobToBase64(blob, (base64) => {
      const payload = {
        blob: base64,
        clipName,
        username,
        category
      };

      axios.post(`${API}/posts`, payload)
        .then(response => {
          dispatch(fetchClips(payload.username));
        })
        .catch(response => {
          dispatch(createClipFail(response));
        });
    });
  }
}


function deleteClipSuccess(response) {
  const { id } = response.data;
  console.log('id', id, 'response', response);

  return {
    type: DELETE_CLIP,
    id
  }
}

function deleteClipFailure(response) {
  console.log(response);
}

export function deleteClip(id) {
  return dispatch => {
    axios.delete(`${API}/clips/${id}`)
      .then(response => {
        dispatch(deleteClipSuccess(response));
      })
      .catch(response => {
        dispatch(deleteClipFailure(response));
      })
  }
}


function updateClipNameSuccess(response) {
  const { description, _id } = response.data;
  return {
    type: UPDATE_CLIP_NAME,
    id: _id,
    description
  }
}

function updateClipNameFailure(response) {
  console.error('failure response', response);
}

export function updateClipName(id, clipName) {
  return dispatch => {
    axios.put(`${API}/clips/${id}`, { clipName })
      .then(response => {
        dispatch(updateClipNameSuccess(response));
      })
      .catch(response => {
        dispatch(updateClipNameFailure(response));
      })
  }
}


export function fetchClips(username) {
  const clips = axios.get(`${API}/${username}/clips`);

  return {
    type: FETCH_CLIPS,
    payload: clips
  };
}


function voteFailure(response) {
  console.log(response);
  return {
    type: VOTE_FAILURE
  }
}

function voteSuccess(response) {
  return {
    type: VOTE_SUCCESS,
    vote: response.data
  }
}

export function voteOnClip(clipId, voteValue) {
  const data = {
    voteValue
  };

  return dispatch => {
    axios.post(`${API}/clips/${clipId}/vote`, data)
      .then(response => {
        dispatch(voteSuccess(response));
      })
      .catch(response => {
        dispatch(voteFailure(response));
      });
  };
}


export function getCategories() {
  const categories = axios.get(`${API}/categories`);

  return {
    type: FETCH_CATEGORIES,
    payload: categories
  };
}


export function getPostsOfCategory(category) {
  const posts = axios.get(`${API}/categories/${category}`);

  return {
    type: FETCH_POSTS_OF_CATEGORY,
    payload: posts
  };
}
