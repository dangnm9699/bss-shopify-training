import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { accountSlice } from "./account";

const rootReducer = combineReducers({
    [accountSlice.name]: accountSlice.reducer,
});

const reducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        default: {
            return rootReducer(state, action);
        }
    }
};

export default reducer;
