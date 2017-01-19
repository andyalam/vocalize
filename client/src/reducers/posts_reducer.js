import {
  FETCH_POSTS,
  VOTE_SUCCESS
} from '../actions/index';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data }

    case VOTE_SUCCESS:
      console.log('worked');
      return state;

    default:
      return state;
  }
}
