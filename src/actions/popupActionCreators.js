//import axios from "axios";
import * as actions from "./actions";
//import { hostApi, nodeApi } from "../constants";

export const openPopup = payload => ({
  type: actions.OPEN_POPUP,
  payload
});

export const closePopup = () => ({
  type: actions.CLOSE_POPUP
});

export const closeAddTokensPopup = () => ({
  type: actions.CLOSE_ADD_TOKENS_POPUP
});

export const openAddTokensPopup = (uuid, data) => ({
  type: actions.OPEN_ADD_TOKENS_POPUP,
  uuid: uuid,
  data: data
});


// export const receivePosts = (subreddit, json) => ({
//   type: actions.RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// });


// export const getTranslationStats = (dispatch) => {
//   axios
//     .get(`${hostApi}/translation/stats`)
//     .then(
//       // success
//       ({ data, status }) => {
//         console.log("getTranslationStats", data, status);
//         return dispatch({
//           type: actions.GET_TRANSLATION_STATS,
//           payload: data
//         });
//       }
//     )
//     .catch(error => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log("====================================");
//       console.log(error);
//       console.log("====================================");
//       console.log(error.config);
//     });
// };

// export const getTransactions = (dispatch) => {
//   axios
//     .get(`${nodeApi}/transactions`)
//     .then(
//       // success
//       ({ data, status }) => {
//         console.log("getTransactions", data, status);
//         return dispatch({
//           type: actions.GET_TRANSACTIONS,
//           payload: data
//         });
//       }
//     )
//     .catch(error => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log("====================================");
//       console.log(error);
//       console.log("====================================");
//       console.log(error.config);
//     });
// };


