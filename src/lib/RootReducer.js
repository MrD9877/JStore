import { combineReducers } from "redux"
import progressReducer from "./progressSlice"
import cartReducer from "./storeSlice"

const combine = combineReducers({ progressReducer, cartReducer })
export default combine