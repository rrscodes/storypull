import {STORY_PENDING, STORY_SUCCESS, STORY_ERROR} from './actionTypes';

export function fetchStory() {
  return dispatch => {
    dispatch(storyActionPending());
    return fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log('story res', json.hits);
        return dispatch(storyActionSuccess(json.hits));
      })
      .catch(error => {
        dispatch(storyActionError(error));
      });
  };
}

function storyActionPending() {
  return {
    type: STORY_PENDING,
  };
}

function storyActionError() {
  return {
    type: STORY_ERROR,
  };
}

function storyActionSuccess(data) {
  return {
    type: STORY_SUCCESS,
    data,
  };
}
