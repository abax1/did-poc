import * as actions from "../../actions/actions";

const initialState = {};

const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INVALIDATE_SUBREDDIT:
    case actions.RECEIVE_POSTS:
    case actions.REQUEST_POSTS:
      return {
        ...state /*, [action.subreddit]: posts(state[action.subreddit], action)*/
      };
    default:
      return state;
  }
};

export default subReducer;
