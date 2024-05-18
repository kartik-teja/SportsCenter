import React, { createContext, useContext, useReducer } from "react";
import { teamReducer, initialState } from "./reducer";
import { TeamState, TeamDispatch } from "./types";
const teamStateContext = createContext<TeamState>(initialState);
const teamDispatchContext = createContext<TeamDispatch>(() => { });
export const TeamProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(teamReducer, initialState);
    return (
        <teamStateContext.Provider value={state}>
            <teamDispatchContext.Provider value={dispatch}>
                {children}
            </teamDispatchContext.Provider>
        </teamStateContext.Provider>
    )
}

export const useTeamState = () => useContext(teamStateContext);
export const useTeamDispatch = () => useContext(teamDispatchContext);