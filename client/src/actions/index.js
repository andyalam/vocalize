import axios from 'axios';


export const FETCH_POSTS = 'FETCH_POSTS';

const API = 'http://localhost:3000/api/posts';

export function fetchPosts() {
  // TODO: FIX API, REPLACE STATIC WITH THIS CALL INSTEAD
  const posts = axios.get(API);
  console.log('posts',posts);

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}
