import { combineReducers } from "@reduxjs/toolkit";
import { accountSlice } from "./account";

const rootReducer = combineReducers({
    [accountSlice.name]: accountSlice.reducer,
});

export default rootReducer;
