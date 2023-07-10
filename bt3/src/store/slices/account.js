import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        info: {
            name: 'loading',
            email: 'loading',
            addresses: [],
        },
        status: 'loading',
    },
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

export const selectAccount = (state) => state.account;
export const { setAccount, setStatus } = accountSlice.actions;
export default accountSlice.reducer;
