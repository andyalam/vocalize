import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import PostsReducer from './posts_reducer';
import ClipsReducer from './clips_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  clips: ClipsReducer
});

export default rootReducer;
