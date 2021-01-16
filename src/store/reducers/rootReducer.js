import { combineReducers } from 'redux'
import mainReducer from "./mainReducer"
import subReducer from "./subReducer"
import popupReducer from "./popupReducer"
import peersReducer from "./peersReducer"

const rootReducer = combineReducers({
    mainReducer,
    subReducer,
    popupReducer,
    peersReducer
  })
  
export default rootReducer
