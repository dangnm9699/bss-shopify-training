import { createContext, useReducer } from "react";

export const RuleFormCxt = createContext();

const actions = Object.freeze({
    SetStates: 'states'
})

const initialState = {
    //
    name: '',
    priority: 0,
    status: 1,
    //
    condition_type: 0,
    condition_products: [],
    condition_collections: [],
    condition_tags: [],
    //
    change_type: 0,
    change_value: 0
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

export function RuleFormCxtProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <RuleFormCxt.Provider value={{
            rule: state,
            setStates: (states) => {
                dispatch({ type: actions.SetStates, states })
            }
        }}>
            {children}
        </RuleFormCxt.Provider>
    )
}
