import {SELECT_POST} from '../actions/type';

const initialState = {
  selectedPost: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    default:
      return state;
  }
};
