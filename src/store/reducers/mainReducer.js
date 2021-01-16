import * as actions from "../../actions/actions";
import { deep_copy } from "../../utilities/utility_funcs";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import { Intent } from "@blueprintjs/core";

const darkAnnotation = {
  annotationColor: "black",
  labelColor: "red",
  mapColor: "darkgreen",
  indicator: "black",
  pulse: "white",
};

const lightAnnotation = {
  annotationColor: "black",
  labelColor: "black",
  mapColor: "darkgreen",
  indicator: "black",
  pulse: "green",
};

const initialState = {
  langs: {},
  balance: {},
  translation: null,
  darkTheme: false,
  showHelpers: false,
  translationStats: {
    translation_count: 0,
  },
  nodeMap: lightAnnotation,

  transactions: [
    {
      iouValue: 0,
      lender: "",
      borrower: "",
      linearId: "",
      contractName: "",
      notary: "",
      txhash: "",
    },
  ],
  accounts: [],
  openSessions: [],
  closedSessions: [],
  mapAnnotations: true,
  testStartData: null,
  bilateralAgreements: [],
  draftBilateralAgreements: [],
  proposalBilateralAgreements: [],
  approvedBilateralAgreements: [],
  udrs: [],
  ddrs: [],
  reconcile: [],
  jobs: [],
  consignmentHistory: [],
  receivedConsignmentHistory: [],
  ucoWallets: [],
  ucoVegWallets: [],
  availableConsignments: [],
  receivedConsignments: [],
  consolidatedCollections: [],
  collections: [],
  wallets: [],
  wallet: {}
};

/**
 * The global application state reducer.
 * @param {object} state
 * @param {string} action
 */
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_THEME:
      console.log("state.darkTheme", state.darkTheme);

      return {
        ...state,
        nodeMap: { ...state.nodeMap },
        darkTheme: !state.darkTheme,
        nodeMap: state.darkTheme
          ? { ...lightAnnotation }
          : { ...darkAnnotation },
      };
    case actions.TOGGLE_HELPERS:
      return {
        ...state,
        showHelpers: !state.showHelpers,
      };
    case actions.GET_JOB:
      return {
        ...state,
        jobs: action.payload,
      };
    case actions.GET_WALLETS:
      return {
        ...state,
        wallets: action.payload.result.payload.map((item) => {
          return JSON.parse(item.valueJson);
        }),
      };
      case actions.GET_UCO_WALLETS:
        return {
          ...state,
          ucoWallets: action.payload.result.payload.map((item) => {
            return JSON.parse(item.valueJson);
          }),
        };
        case actions.GET_UCO_VEG_WALLETS:
        return {
          ...state,
          ucoVegWallets: action.payload.result.payload.map((item) => {
            return JSON.parse(item.valueJson);
          }),
        };
      case actions.GET_AVAILABLE_CONSIGNMENTS:
      return {
        ...state,
        availableConsignments: action.payload.result.payload.map((item) => {
          return JSON.parse(item.valueJson);
        }),
      };
      case actions.GET_COLLECTION:
      return {
        ...state,
        collections: action.payload.result.payload,
      };
      case actions.GET_WALLET:
      return {
        ...state,
        wallet: action.payload.result.payload,
      };
    case actions.GET_SENT_CONSIGNMENT_HISTORY:
      return {
        ...state,
        consignmentHistory: action.payload.result.payload.map((item) => {
          return JSON.parse(item.valueJson);
        }),
      };
    case actions.GET_RECEIVED_CONSIGNMENT_HISTORY:
      return {
        ...state,
        receivedConsignmentHistory: action.payload.result.payload.map(
          (item) => {
            return JSON.parse(item.valueJson);
          }
        ),
      };
    case actions.GET_RECEIVED_CONSIGNMENTS:
      return {
        ...state,
        receivedConsignments: action.payload.result.payload.map((item) => {
          return JSON.parse(item.valueJson);
        }),
      };
    case actions.GET_CONSOLIDATED_COLLECTIONS:
      return {
        ...state,
        consolidatedCollections: action.payload.result.payload
      };
    case actions.BILATERAL_AGREEMENTS:
      return {
        ...state,
        bilateralAgreements: action.payload,
      };
    case actions.GET_UDRS:
      return {
        ...state,
        udrs: action.payload,
      };
    case actions.GET_RECONCILE_STATES:
      return {
        ...state,
        reconcile: action.payload,
      };
    case actions.GET_DDRS:
      return {
        ...state,
        ddrs: action.payload,
      };
    case actions.DRAFT_BILATERAL_AGREEMENTS:
      return {
        ...state,
        draftBilateralAgreements: action.payload,
      };
    case actions.PROPOSAL_BILATERAL_AGREEMENTS:
      return {
        ...state,
        proposalBilateralAgreements: action.payload,
      };
    case actions.APPROVED_BILATERAL_AGREEMENTS:
      return {
        ...state,
        approvedBilateralAgreements: action.payload,
      };
    case actions.TOGGLE_ANNOTATIONS:
      return {
        ...state,
        mapAnnotations: !state.mapAnnotations,
      };
    case actions.GET_LANGS:
      return {
        ...state,
        langs: deep_copy(action.payload),
      };
    case actions.START_SESSION:
    case actions.END_SESSION:
      return {
        ...state,
        testResponseData: { ...action.payload },
      };
    case actions.GET_TRANSLATION_STATS:
      return {
        ...state,
        translationStats: { ...action.payload },
      };
    case actions.GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload],
      };
    case actions.GET_OPEN_TRANSACTIONS:
      return {
        ...state,
        openSessions: [...action.payload],
      };
    case actions.GET_CLOSED_TRANSACTIONS:
      return {
        ...state,
        closedSessions: [...action.payload],
      };
    case actions.GET_ACCOUNTS:
      return {
        ...state,
        accounts: [...action.payload],
      };
    case actions.SHOW_TOAST:
      AppToaster.show({
        message: action.message,
        intent: Intent.PRIMARY,
        icon: "globe",
      });
      return state;
    default:
      return state;
  }
};

export default mainReducer;
