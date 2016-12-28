import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  errorMessage: '',
  creds: {
    username: '',
    password: ''
  }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };

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
      };

    default:
      return state;
  }
}
