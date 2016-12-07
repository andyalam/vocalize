import { FETCH_POSTS } from '../actions/index';

const INITAL_STATE = { all: [] };

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      console.log('fetching posts');
      return { ...state, all: action.payload.data }
    default:
      return state;
  }
}
