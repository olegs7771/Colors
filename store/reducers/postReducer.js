import {SEND_POST} from '../actions/type';

const initialState = {
  post: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_POST:
      return {
        ...state,
        post: action.payload.post,
      };
    default:
      return state;
  }
};
