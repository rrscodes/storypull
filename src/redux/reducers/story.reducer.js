import {
  STORY_PENDING,
  STORY_ERROR,
  STORY_SUCCESS,
} from '../actions/actionTypes';
const initialState = {
  isLoading: true,
  error: false,
  story: [],
};
export default (storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORY_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case STORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case STORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        story: action.data,
      };
    default:
      return state;
  }
});
