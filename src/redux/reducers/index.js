import {combineReducers} from 'redux';
import story from './story.reducer';

const appReducer = combineReducers({
  story,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
