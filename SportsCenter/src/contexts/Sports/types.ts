import React from "react";

export interface SportsState {
    sportData: { "sports": sport[] };
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export enum SportListAvailableActions {
    FETCH_SPORTS_REQUEST = "FETCH_SPORTS_REQUEST",
    FETCH_SPORTS_SUCCESS = "FETCH_SPORTS_SUCCESS",
    FETCH_SPORTS_FAILURE = "FETCH_SPORTS_FAILURE"
}

export type sport = {
    id: number;
    name: string;
}



export type SportPayload = Omit<sport, "id">;

export type SportActions =
    | { type: SportListAvailableActions.FETCH_SPORTS_REQUEST }
    | { type: SportListAvailableActions.FETCH_SPORTS_SUCCESS; payload: { "sports": sport[] } }
    | { type: SportListAvailableActions.FETCH_SPORTS_FAILURE; payload: string }

export type SportDispatch = React.Dispatch<SportActions>;
