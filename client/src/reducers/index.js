import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer.js'

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
