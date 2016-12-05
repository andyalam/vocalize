import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

export function fetchPosts() {
  // static content, hook up an axios call to API
  // for the next step
  // ex: const posts = axios.get(`${API}`);
  const posts = [
    {
      user: 'randomuser1',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    },
    {
      user: 'randomuser2',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    },
    {
      user: 'randomuser3',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    }
  ];

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}
