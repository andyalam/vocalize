import { CREATE_CLIP, DELETE_CLIP, UPDATE_CLIP_NAME } from '../actions/index';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_CLIP:
      const clip = {
        blob: action.blob,
        id: action.id,
        clipName: action.clipName
      }
      return [ clip, ...state ];

    case DELETE_CLIP:
      return state.filter((clip) => clip.id != action.id);

    case UPDATE_CLIP_NAME:
      return state.map((clip) => {
        if (clip.id == action.id) {
          return {
            blob: clip.blob,
            id: clip.id,
            clipName: action.newName
          }
        }
        return clip;
      });

    default:
      return state;
  }
}
