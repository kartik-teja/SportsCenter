import { Reducer } from "react";
import { SportsState, SportActions, SportListAvailableActions } from "./types";
import initialData from "./initialData";

export const initialState: SportsState = {
    sportData: initialData,
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const sportReducer: Reducer<SportsState, SportActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SportListAvailableActions.FETCH_SPORTS_REQUEST:
            return { ...state, isLoading: true };
        case SportListAvailableActions.FETCH_SPORTS_SUCCESS:
            return { ...state, isLoading: false, sportData: action.payload };
        case SportListAvailableActions.FETCH_SPORTS_FAILURE:
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
