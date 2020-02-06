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
        user: {
          email: action.payload.email,
          _id: action.payload._id,
          avatar: action.payload.avatar,
          //path ref for delete()
          path: action.payload.path,
        },
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
