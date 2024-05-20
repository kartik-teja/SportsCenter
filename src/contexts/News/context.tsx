import React, { createContext, useContext, useReducer } from "react";
import { newsReducer, initialState } from "./reducer";
import { LiveNewsState, NewsDispatch } from "./types";
const newsStateContext = createContext<LiveNewsState>(initialState);
const newsDispatchContext = createContext<NewsDispatch>(() => { });
export const NewsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(newsReducer, initialState);
    return (
        <newsStateContext.Provider value={state}>
            <newsDispatchContext.Provider value={dispatch}>
                {children}
            </newsDispatchContext.Provider>
        </newsStateContext.Provider>
    )
}

export const useNewsState = () => useContext(newsStateContext);
export const useNewsDispatch = () => useContext(newsDispatchContext);