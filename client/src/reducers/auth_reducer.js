import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/index';

const INITAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  errorMessage: '',
  creds: {
    username: '',
    password: ''
  }
};

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };

    default:
      return state;
  }
}
