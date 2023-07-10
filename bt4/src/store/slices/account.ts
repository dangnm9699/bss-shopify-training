import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AccountInfo } from "@/types/AccountInfo";
import { FetchingStatus } from "@/types/Fetching";

const initialState: { info: AccountInfo, status: FetchingStatus } = {
    info: {
        name: 'loading',
        email: 'loading',
        addresses: [],
    },
    status: 'loading',
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            console.log(action)
            state.info = { ...(action.payload) };
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const selectAccount = (state: RootState) => state.account;
export const { setAccount, setStatus } = accountSlice.actions;
export default accountSlice.reducer;
