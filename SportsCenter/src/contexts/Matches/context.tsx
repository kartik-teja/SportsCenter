import React, { createContext, useContext, useReducer } from "react";
import { matchReducer, initialState } from "./reducer";
import { MatchListState, matchDispatch } from "./types";
const matchStateContext = createContext<MatchListState>(initialState);
const matchDispatchContext = createContext<matchDispatch>(() => { });
export const MatchProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(matchReducer, initialState);
    return (
        <matchStateContext.Provider value={state}>
            <matchDispatchContext.Provider value={dispatch}>
                {children}
            </matchDispatchContext.Provider>
        </matchStateContext.Provider>
    )
}

export const useMatchState = () => useContext(matchStateContext);
export const useMatchDispatch = () => useContext(matchDispatchContext);