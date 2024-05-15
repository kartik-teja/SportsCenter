import { Reducer } from "react";

import LiveMatches from "./initialData";
import { MatchActions, MatchListAvailableActions, MatchListState } from "./types";

export const initialState: MatchListState = {
    matchData: LiveMatches,
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export const matchReducer: Reducer<MatchListState, MatchActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case MatchListAvailableActions.FETCH_MATCH_REQUEST:
            return { ...state, isLoading: true };
        case MatchListAvailableActions.FETCH_MATCH_SUCCESS:
            return { ...state, isLoading: false, matchData: action.payload };
        case MatchListAvailableActions.FETCH_MATCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}