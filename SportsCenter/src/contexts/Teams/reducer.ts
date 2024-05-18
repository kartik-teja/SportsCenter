import { Reducer } from "react";
import { TeamState, TeamActions, TeamListAvailableActions } from "./types";
import initialData from "./initialData";

export const initialState: TeamState = {
    teamData: initialData,
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const teamReducer: Reducer<TeamState, TeamActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TeamListAvailableActions.FETCH_TEAM_REQUEST:
            return { ...state, isLoading: true };
        case TeamListAvailableActions.FETCH_TEAM_SUCCESS:
            return { ...state, isLoading: false, teamData: action.payload };
        case TeamListAvailableActions.FETCH_TEAM_FAILURE:
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
