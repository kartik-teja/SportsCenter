import React, { createContext, useContext, useReducer } from "react";
import { userReducer, initialState } from "./reducer";
import { UserState, UserDispatch } from "./types";
const userStateContext = createContext<UserState>(initialState);
const userDispatchContext = createContext<UserDispatch>(() => { });
export const UserProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    return (
        <userStateContext.Provider value={state}>
            <userDispatchContext.Provider value={dispatch}>
                {children}
            </userDispatchContext.Provider>
        </userStateContext.Provider>
    )
}

export const useUserState = () => useContext(userStateContext);
export const useUserDispatch = () => useContext(userDispatchContext);