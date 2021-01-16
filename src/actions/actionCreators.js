import axios from "axios";
import * as actions from "./actions";
import {
  nodeApi,
  API_KEY,
  etlApi,
  blockchainApi,
  bioApi,
  authParams,
} from "../constants";
import { Intent } from "@blueprintjs/core";

export const createConsignment = (
  callback,
  displayToast,
  oilType,
  walletList,
  amount,
  dispatch
) => {
  const walletString = JSON.stringify(walletList);

  console.log(walletString);

  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "CreateConsignment",
        args: [oilType, walletString, amount],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(({ data, status }) => {
      console.log("createConsignment", data, status);
      callback({
        data,
        status,
        isLoading: false,
        close: true,
      }); // TODO: use a callback for now - connect to redux later

      displayToast(
        Intent.SUCCESS,
        `Consignment created successfully with Transaction ID: ${data.txid}.`
      );
      // Dispatch an action here to update the global status.
      if (dispatch) {
        return dispatch({
          type: actions.CREATE_CONSIGNMENT,
          payload: data,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getCollections = (
  callback,
  displayToast,
  collectionId,
  dispatch
) => {
  // const enpointList = collectionsList.map((collectionId)=>{
  //   axios
  //   .post(
  //     `${bioApi}/transaction/invocation`,
  //     {
  //       channel: "bioledgerchannel",
  //       chaincode: "bioledger_cc",
  //       method: "QueryAsset",
  //       args: [collectionId],
  //       payloadType: "JSON",
  //     },
  //     {
  //       headers: {
  //         Authorization: authParams,
  //       },
  //     }
  //   )
  // })

  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "QueryAsset",
        args: [collectionId],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(({ data, status }) => {
      console.log("getCollections", data, status);
      callback({
        data,
        status,
        isLoading: false,
        close: true,
      }); // TODO: use a callback for now - connect to redux later

      displayToast(
        Intent.SUCCESS,
        `Consignment sent successfully with Transaction ID: ${data.txid}.`
      );
      // Dispatch an action here to update the global status.
      if (dispatch) {
        return dispatch({
          type: actions.GET_COLLECTION,
          payload: data,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        // callback({
        //   data: error.response.data,
        //   status: error.response.status,
        //   isLoading: false,
        // }); // TODO: use a callback for now - connect to redux later

        // displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getWallet = (
  callback,
  displayToast,
  walletId,
  dispatch
) => {
  // const enpointList = collectionsList.map((collectionId)=>{
  //   axios
  //   .post(
  //     `${bioApi}/transaction/invocation`,
  //     {
  //       channel: "bioledgerchannel",
  //       chaincode: "bioledger_cc",
  //       method: "QueryAsset",
  //       args: [collectionId],
  //       payloadType: "JSON",
  //     },
  //     {
  //       headers: {
  //         Authorization: authParams,
  //       },
  //     }
  //   )
  // })

  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "QueryAsset",
        args: [walletId],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(({ data, status }) => {
      console.log("getWallet", data, status);
      callback({
        data,
        status,
        isLoading: false,
        close: true,
      }); // TODO: use a callback for now - connect to redux later

      displayToast(
        Intent.SUCCESS,
        `Consignment sent successfully with Transaction ID: ${data.txid}.`
      );
      // Dispatch an action here to update the global status.
      console.log("DISPATCH")
        return dispatch({
          type: actions.GET_WALLET,
          payload: data,
        });
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        // callback({
        //   data: error.response.data,
        //   status: error.response.status,
        //   isLoading: false,
        // }); // TODO: use a callback for now - connect to redux later

        // displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

/**
 * Get Job by ID.
 * @param jobId
 * @param dispatch
 */
export const getJobById = (callback, jobId, dispatch) => {
  axios
    .get(`${blockchainApi}/jobs/job?jobid=${jobId}`)
    .then(
      // success

      ({ data, status }) => {
        callback(); // TODO: use a callback for now - connect to redux later
        console.log("getJobById", data, status);
        return dispatch({
          type: actions.GET_JOB,
          payload: data.items,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const sendSyncConsignment = (
  callback,
  displayToast,
  sendParams,
  feedstock,
  consignmentId,
  amountToSend,
  dispatch
) => {
  const { to, address, ghg, cert, country } = sendParams;
    return axios.post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "SendConsignment",
        args: [
          `${to}`,
          `${address}`,
          `${consignmentId}`,
          `${amountToSend}`,
          `${feedstock}`,
          `${ghg}`,
          `${country}`,
          `${cert}`,
        ],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    );

  
};

export const sendConsignment = (
  callback,
  displayToast,
  sendParams,
  feedstock,
  consignmentId,
  amountToSend,
  dispatch
) => {
  const { to, address, ghg, cert, country } = sendParams;

  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "SendConsignment",
        args: [
          `${to}`,
          `${address}`,
          `${consignmentId}`,
          `${amountToSend}`,
          `${feedstock}`,
          `${ghg}`,
          `${country}`,
          `${cert}`,
        ],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("sendConsignment", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(
          Intent.SUCCESS,
          `Consignment sent successfully with Transaction ID: ${data.txid}.`
        );
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_AVAILABLE_CONSIGNMENTS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const sendDriverCollection = (
  callback,
  displayToast,
  driverId,
  restaurantId,
  jobId,
  lat,
  long,
  volume,
  oilCat
) => {

  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "DriverCollection",
        args: [
          `${driverId}`,
          `${restaurantId}`,
          `${jobId}`,
          `${lat}`,
          `${long}`,
          "litres",
          `${volume}`,
          `${oilCat}`,
        ],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("sendConsignment", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(
          Intent.SUCCESS,
          `Consignment sent successfully with Transaction ID: ${data.txid}.`
        );
        // Dispatch an action here to update the global status.
        // if (dispatch) {
        //   return dispatch({
        //     type: actions.GET_AVAILABLE_CONSIGNMENTS,
        //     payload: data,
        //   });
        // }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};


export const getAvailableConsignments = (
  callback,
  displayToast,
  walletType,
  dispatch
) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "GetAvailableConsignments",
        args: [`${walletType}`],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getAvailableConsignments", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_AVAILABLE_CONSIGNMENTS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getConsolidatedCollections = (
  callback,
  displayToast,
  jobId,
  dispatch
) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "ConsolidatedCollection",
        args: [`${jobId}`],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getConsolidatedCollections", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_CONSOLIDATED_COLLECTIONS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        //callback({
        //  data: error.response.data,
        //  status: error.response.status,
        //  isLoading: false,
        //}); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, "Error");
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const createWallet = (
  callback,
  displayToast,
  jobId,
  lat,
  long,
  country
) => {
  axios
    .post(
      `${bioApi}/transaction/invocation`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "CreateWallet",
        args: [`${jobId}`, `${lat}`, `${long}`, `${country}`],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getConsolidatedCollections", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(
          Intent.SUCCESS,
          `Wallet successfully created with Transaction ID: ${data.txid}.`
        );
        // Dispatch an action here to update the global status.
        // if (dispatch) {
        //   return dispatch({
        //     type: actions.GET_CONSOLIDATED_COLLECTIONS,
        //     payload: data,
        //   });
        // }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        //callback({
        //  data: error.response.data,
        //  status: error.response.status,
        //  isLoading: false,
        //}); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, "Error");
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};


export const getReceivedConsignments = (callback, displayToast, dispatch) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "ReceivedConsignmentHistory",
        args: [],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getReceivedConsignments", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_RECEIVED_CONSIGNMENTS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getUcoWallets = (callback, displayToast, dispatch) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "GetAvailableWallets",
        args: ["UCO"],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getUcoWallets", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_UCO_WALLETS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getUcoVegWallets = (callback, displayToast, dispatch) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "GetAvailableWallets",
        args: ["UCO_VEG"],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getUcoVegWallets", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_UCO_VEG_WALLETS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getWallets = (callback, displayToast, walletType, dispatch) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "GetAvailableWallets",
        args: [walletType],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getWallets", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_WALLETS,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);

        displayToast(Intent.DANGER, `Error:`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getSentConsignmentHistory = (callback, displayToast, dispatch) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "SentConsignmentHistory",
        args: [],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getSentConsignmentHistory", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_SENT_CONSIGNMENT_HISTORY,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getReceivedConsignmentHistory = (
  callback,
  displayToast,
  dispatch
) => {
  axios
    .post(
      `${bioApi}/transaction/query`,
      {
        channel: "bioledgerchannel",
        chaincode: "bioledger_cc",
        method: "ReceivedConsignmentHistory",
        args: [],
        payloadType: "JSON",
      },
      {
        headers: {
          Authorization: authParams,
        },
      }
    )
    .then(
      // success
      ({ data, status }) => {
        console.log("getReceivedConsignmentHistory", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.GET_RECEIVED_CONSIGNMENT_HISTORY,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const showToast = () => ({
  type: actions.SHOW_TOAST,
  message: "Hello World",
});

export const toggleHelpers = () => ({
  type: actions.TOGGLE_HELPERS,
});

export const toggleTheme = () => ({
  type: actions.TOGGLE_THEME,
});

export const toggleAnnotations = () => ({
  type: actions.TOGGLE_ANNOTATIONS,
});

export const postCreateAccount = (
  callback,
  displayToast,
  dispatch,
  accountName,
  contactEndpoint
) => {
  axios
    .post(`${nodeApi}/accounts`, {
      accountName: accountName,
      endPointUrl: contactEndpoint,
      amount: 0,
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("postCreateAccount", data, status);
        callback({
          data,
          status,
          isLoading: false,
          close: true,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
        if (dispatch) {
          return dispatch({
            type: actions.CREATE_ACCOUNT,
            payload: data,
          });
        }
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const postAddTokens = (callback, displayToast, tokenCount, uuid) => {
  console.log("postAddTokens: ", tokenCount, uuid);
  axios
    .post(`${nodeApi}/tokens`, {
      uuid: uuid,
      amount: tokenCount,
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("postAddTokens", data, status);
        callback({
          data,
          status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getAccounts = (dispatch) => {
  axios
    .get(`${nodeApi}/accounts`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getAccounts", data, status);
        return dispatch({
          type: actions.GET_ACCOUNTS,
          payload: data.accounts,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getDraftAgreements = (dispatch) => {
  axios
    .get(`${nodeApi}/bilateral-agreements?status=DRAFT`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getDraftAgreements", data, status);
        return dispatch({
          type: actions.DRAFT_BILATERAL_AGREEMENTS,
          payload: data.agreements,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getProposalAgreements = (dispatch) => {
  axios
    .get(`${nodeApi}/bilateral-agreements?status=PROPOSAL`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getProposalAgreements", data, status);
        return dispatch({
          type: actions.PROPOSAL_BILATERAL_AGREEMENTS,
          payload: data.agreements,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const submitAgreement = (callback, displayToast, uuid) => {
  console.log("submitAgreement: ", uuid);
  axios
    .put(`${nodeApi}/bilateral-agreements?linearId=${uuid}`)
    .then(
      // success
      ({ data, status }) => {
        console.log("submitAgreement", data, status);
        callback({
          data,
          status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getApprovedAgreements = (dispatch) => {
  axios
    .get(`${nodeApi}/bilateral-agreements?status=APPROVED`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getApprovedAgreements", data, status);
        return dispatch({
          type: actions.APPROVED_BILATERAL_AGREEMENTS,
          payload: data.agreements,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const submitApproval = (callback, displayToast, uuid) => {
  console.log("submitApproval: ", uuid);
  axios
    .post(`${nodeApi}/bilateral-agreements/approve`, null, {
      params: {
        linearId: uuid,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("submitApproval", data, status);
        callback({
          data,
          status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const createBilateralAgreement = (callback, displayToast, params) => {
  console.log("createBilateralAgreement: ", params);
  axios
    .post(`${nodeApi}/bilateral-agreements`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("createBilateralAgreement", data, status);
        callback({
          data,
          status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.SUCCESS, data.message);
        // Dispatch an action here to update the global status.
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("a", error.response.data);
        console.log("b", error.response.status);
        console.log("c", error.response.headers);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        console.log("Error status: ", error.status);
        displayToast(Intent.DANGER, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback({
          data: error.request,
          status: error.request.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error ${error.request.status}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback({
          data: error.response.data,
          status: error.response.status,
          isLoading: false,
        }); // TODO: use a callback for now - connect to redux later

        displayToast(Intent.DANGER, `Error: ${error.response.data}`);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getUdrs = (dispatch) => {
  axios
    .get(`${nodeApi}/udr`, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("getUdrs", data, status);
        return dispatch({
          type: actions.GET_UDRS,
          payload: data.udrs,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getDdrs = (dispatch) => {
  axios
    .get(`${etlApi}/my-ddrs`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getDdrs", data, status);
        return dispatch({
          type: actions.GET_DDRS,
          payload: data,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getUdrsFiles = (dispatch) => {
  axios
    .get(`${etlApi}/my-udrs`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getDdrs", data, status);
        return dispatch({
          type: actions.GET_UDRS_FILES,
          payload: data,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getReconcile = (dispatch) => {
  axios
    .get(`${nodeApi}/reconcile`, {
      headers: {
        API_KEY: API_KEY,
      },
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("getDdrs", data, status);
        return dispatch({
          type: actions.GET_RECONCILE_STATES,
          payload: data.reconcile_states,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const downloadDdr = (dispatch, filename) => {
  axios({
    url: `${etlApi}/my-ddrs/${filename}`, //your url
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

export const downloadUdr = (dispatch, filename) => {
  axios({
    url: `${etlApi}/my-udrs/${filename}`, //your url
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

// export const downloadDdr = (dispatch, filename) => {
//   axios
//     .get(`${etlApi}/my-ddrs/${filename}`)
//     .then(
//       // success
//       ({ data, status }) => {
//         console.log("downloadDdr", data, status);
//         return dispatch({
//           type: actions.DOWNLOAD_DDR,
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

export const getTransactions = (dispatch) => {
  axios
    .get(`${nodeApi}/transactions`)
    .then(
      // success
      ({ data, status }) => {
        console.log("getTransactions", data, status);
        return dispatch({
          type: actions.GET_TRANSACTIONS,
          payload: data.parking_sessions,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getOpenTransactions = (dispatch, uuid) => {
  let url =
    uuid === ""
      ? `${nodeApi}/sessions?option=open`
      : `${nodeApi}/sessions?option=open&account_uuid=${uuid}`;
  axios
    .get(url)
    .then(
      // success
      ({ data, status }) => {
        console.log("getOpenTransactions", data, status);
        return dispatch({
          type: actions.GET_OPEN_TRANSACTIONS,
          payload: data.sessions,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const getClosedTransactions = (dispatch, uuid) => {
  let url =
    uuid === ""
      ? `${nodeApi}/sessions?option=completed`
      : `${nodeApi}/sessions?option=completed&account_uuid=${uuid}`;
  axios
    .get(url)
    .then(
      // success
      ({ data, status }) => {
        console.log("getClosedTransactions", data, status);
        return dispatch({
          type: actions.GET_CLOSED_TRANSACTIONS,
          payload: data.sessions,
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const sendStartSession = (dispatch, startSessionData, gpsOption) => {
  axios
    .post(`${nodeApi}/startsession`, {
      target_node: startSessionData.targetHostName,
      target_uuid: startSessionData.targetUUID,
      source_uuid: startSessionData.sourceUUID,
      gps_option:
        gpsOption === "happy"
          ? "MOCK_HAPPY_PATH"
          : "MOCK_START_SESSION_NO_CONSENSUS",
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("sendStartSession", data, status);
        return dispatch({
          type: actions.START_SESSION,
          payload: { ...data, status },
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let data = error.response.data;
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        let status = error.response.status;
        return dispatch({
          type: actions.START_SESSION,
          payload: { ...data, status },
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};

export const sendEndSession = (
  dispatch,
  endSessionData,
  gpsOption,
  linearId,
  duration
) => {
  axios
    .post(`${nodeApi}/endsession`, {
      target_node: endSessionData.targetHostName,
      target_uuid: endSessionData.targetUUID,
      source_uuid: endSessionData.sourceUUID,
      linear_id: linearId,
      gps_option:
        gpsOption === "happy"
          ? "MOCK_HAPPY_PATH"
          : "MOCK_END_SESSION_CAR_STILL_PARKED",
      test_session_duration: duration,
    })
    .then(
      // success
      ({ data, status }) => {
        console.log("sendEndSession", data, status);
        return dispatch({
          type: actions.END_SESSION,
          payload: { ...data, status },
        });
      }
    )
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let data = error.response.data;
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        let status = error.response.status;
        return dispatch({
          type: actions.END_SESSION,
          payload: { ...data, status },
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log(error.config);
    });
};
