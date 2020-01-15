import {GET_AUTH} from '../actions/type';

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
    default:
      return state;
  }
};
