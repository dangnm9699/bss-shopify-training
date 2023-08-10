import { createContext, useReducer } from "react";

export const GlobalCtx = createContext();

const actions = Object.freeze({
    SetStates: 'states',
    SetAppInstalltion: 'metafields',
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
    },
    "currentAppInstallation": {
        "id": "",
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.SetStates:
            return {
                ...state,
                ...action.states
            };
        case actions.SetAppInstalltion:
            console.log('state', state)
            state.currentAppInstallation = action.states;
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
            },
            setAppInstalltion: (states) => {
                dispatch({ type: actions.SetAppInstalltion, states })
            }
        }}>
            {children}
        </GlobalCtx.Provider>
    )
}
