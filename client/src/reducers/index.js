import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer.js';
import ClipsReducer from './reducer_clips';

const rootReducer = combineReducers({
  posts: PostsReducer,
  clips: ClipsReducer
});

export default rootReducer;
