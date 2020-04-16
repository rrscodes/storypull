import {
  STORY_PENDING,
  STORY_ERROR,
  STORY_SUCCESS,
  STORY_SUCCESS_NEXT,
  STORY_SUCCESS_SCROLL,
} from '../actions/actionTypes';
const initialState = {
  isLoading: true,
  error: false,
  story: [],
  count: 0,
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
        count: state.count + 1,
      };
    case STORY_SUCCESS_NEXT:
      return {
        ...state,
        isLoading: false,
        story: [...state.story, ...action.data],
        count: state.count + 1,
      };
    case STORY_SUCCESS_SCROLL:
      return {
        ...state,
        isLoading: false,
        story: [...state.story, ...action.data],
        count: state.count + 1,
      };
    default:
      return state;
  }
});
