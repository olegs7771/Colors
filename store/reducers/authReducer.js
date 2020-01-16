import {GET_AUTH, LOGOUT_USER} from '../actions/type';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        user: action.payload.email,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
