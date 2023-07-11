import { createContext, useReducer } from "react";

export const GlobalCtx = createContext();

const actions = Object.freeze({
    SetStates: 'states'
})

const initialState = {
    "name": "",
    "email": "",
    "contactEmail": "",
    "myshopifyDomain": "",
    "ianaTimezone": "",
    "currencyCode": "",
    "currencyFormats": {
        "moneyFormat": ""
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.SetStates:
            return {
                ...state,
                ...action.states
            };
        default:
            return state;
    }
}

export function GlobalCtxProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <GlobalCtx.Provider value={{
            shop: state,
            setStates: (states) => {
                dispatch({ type: actions.SetStates, states })
            }
        }}>
            {children}
        </GlobalCtx.Provider>
    )
}
