import React from "react";

export interface TeamState {
    teamData: team[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export enum TeamListAvailableActions {
    FETCH_TEAM_REQUEST = "FETCH_TEAM_REQUEST",
    FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS",
    FETCH_TEAM_FAILURE = "FETCH_TEAM_FAILURE"
}

export type team = {
    id: number;
    name: string;
    plays: string;
}

export type TeamPayload = Omit<team, "id">;

export type TeamActions =
    | { type: TeamListAvailableActions.FETCH_TEAM_REQUEST }
    | { type: TeamListAvailableActions.FETCH_TEAM_SUCCESS; payload: team[] }
    | { type: TeamListAvailableActions.FETCH_TEAM_FAILURE; payload: string }

export type TeamDispatch = React.Dispatch<TeamActions>;
