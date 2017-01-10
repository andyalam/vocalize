import {
  FETCH_CLIPS,
  CREATE_CLIP,
  DELETE_CLIP,
  UPDATE_CLIP_NAME,
  CLIP_UPLOAD_FAILED
} from '../actions/index';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CLIPS:
      return action.payload.data;

    case CREATE_CLIP:
      // may want to trigger loader here eventually
      return state;

    case DELETE_CLIP:
      console.log('action', action.id);
      return state.filter((clip) => clip.id != action.id);

    case UPDATE_CLIP_NAME:
      return state.map((clip) => {
        if (clip.id == action.id) {
          return {
            ...clip,
            description: action.description
          }
        }
        return clip;
      });

    default:
      return state;
  }
}
