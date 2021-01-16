import * as actions from "../../actions/actions";

const initialState = {
  peers: [],
  me: {
    "host": {
      "name": "",
      "key": "",
      "registered": ""
    },
    "message": ""
  }
};

const peersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PEERS:
      return {
        ...state, 
        peers: action.payload
      };
      case actions.GET_ME:
      return {
        ...state, 
        me: action.payload
      };
    default:
      return state;
  }
};

export default peersReducer;
