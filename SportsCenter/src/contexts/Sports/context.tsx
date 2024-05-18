import React, { createContext, useContext, useReducer } from "react";
import { sportReducer, initialState } from "./reducer";
import { SportsState, SportDispatch } from "./types";
const sportStateContext = createContext<SportsState>(initialState);
const sportDispatchContext = createContext<SportDispatch>(() => { });
export const SportProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(sportReducer, initialState);
    return (
        <sportStateContext.Provider value={state}>
            <sportDispatchContext.Provider value={dispatch}>
                {children}
            </sportDispatchContext.Provider>
        </sportStateContext.Provider>
    )
}

export const useSportState = () => useContext(sportStateContext);
export const useSportDispatch = () => useContext(sportDispatchContext);