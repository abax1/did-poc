import * as actions from "../../actions/actions";

const initialState = {
  overlayState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
    useTallContent: false
  },
  payload: "",
  /* Add tokens popup values */
  addTokensOverlayState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
    useTallContent: false
  },
  uuid: ""
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLOSE_POPUP:
      return {
        ...state,
        overlayState: { ...state.overlayState, isOpen: false }
      };
    case actions.OPEN_POPUP:
      return {
        ...state /*, [action.subreddit]: posts(state[action.subreddit], action)*/,
        overlayState: { ...state.overlayState, isOpen: true },
        payload: action.payload
      };
    case actions.OPEN_ADD_TOKENS_POPUP:
      return {
        ...state /*, [action.subreddit]: posts(state[action.subreddit], action)*/,
        addTokensOverlayState: { ...state.addTokensOverlayState, isOpen: true },
        uuid: action.uuid,
        data: action.data
      };
    case actions.CLOSE_ADD_TOKENS_POPUP:
      return {
        ...state,
        addTokensOverlayState: { ...state.addTokensOverlayState, isOpen: false }
      };
    default:
      return state;
  }
};

export default popupReducer;
