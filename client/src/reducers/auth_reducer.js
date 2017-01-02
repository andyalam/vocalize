import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT
} from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.id_token,
        isAuthenticated: action.isAuthenticated,
        errorMessage: ''
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: 'Invalid Login'
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id_token: action.id_token
      }

    case REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
