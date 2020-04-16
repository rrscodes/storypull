import {
  STORY_PENDING,
  STORY_SUCCESS,
  STORY_SUCCESS_NEXT,
  STORY_ERROR,
  STORY_SUCCESS_SCROLL,
} from './actionTypes';
export function fetchStory(scroll) {
  var setIntervalNonScroll, setIntervalScroll;

  console.log('scroll', scroll);
  if (!scroll) {
    return (dispatch, getState) => {
      clearInterval(setIntervalScroll);
      let count = getState().story.count;
      console.log(count);
      dispatch(storyActionPending());
      console.log('not scroll', count);
      return (
        fetch(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`,
          {
            method: 'GET',
          },
        )
          .then(response => response.json())
          .then(json => {
            return dispatch(storyActionSuccess(json.hits));
          })
          .catch(error => {
            dispatch(storyActionError(error));
          }),
        (setIntervalNonScroll = setInterval(() => {
          let count = getState().story.count;
          console.log('not scroll setI', count);
          fetch(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`,
            {
              method: 'GET',
            },
          )
            .then(response => response.json())
            .then(json => {
              return dispatch(storyActionSuccessNext(json.hits));
            })
            .catch(error => {
              dispatch(storyActionError(error));
            });
        }, 10000))
      );
    };
  } else {
    return (dispatch, getState) => {
      clearInterval(setIntervalNonScroll);
      let count = getState().story.count;
      console.log('scroll', count);
      return (
        fetch(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count +
            1}`,
          {
            method: 'GET',
          },
        )
          .then(response => response.json())
          .then(json => {
            return dispatch(storyActionSuccessScroll(json.hits));
          })
          .catch(error => {
            dispatch(storyActionError(error));
          }),
        (setIntervalScroll = setInterval(() => {
          let count = getState().story.count;
          console.log('scroll setI', count);
          fetch(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`,
            {
              method: 'GET',
            },
          )
            .then(response => response.json())
            .then(json => {
              return dispatch(storyActionSuccessNext(json.hits));
            })
            .catch(error => {
              dispatch(storyActionError(error));
            });
        }, 10000))
      );
    };
  }
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

function storyActionSuccessNext(data) {
  return {
    type: STORY_SUCCESS_NEXT,
    data,
  };
}

function storyActionSuccessScroll(data) {
  return {
    type: STORY_SUCCESS_SCROLL,
    data,
  };
}
