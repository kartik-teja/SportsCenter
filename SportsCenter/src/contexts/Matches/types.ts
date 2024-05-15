import React from "react";

export interface MatchListState {
    matchData: LiveMatches;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export enum MatchListAvailableActions {
    FETCH_MATCH_REQUEST = "FETCH_MATCH_REQUEST",
    FETCH_MATCH_SUCCESS = "FETCH_MATCH_SUCCESS",
    FETCH_MATCH_FAILURE = "FETCH_MATCH_FAILURE"
}

export type team = {
    id: number;
    name: string;
}

export type Match = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt: string;
    isRunning: boolean;
    teams: team[]
}

export type Matches = {
    [k: string]: Match;
}

export type MatchPayload = Omit<Match, "id" | "location" | "sportName" | "teams">;

export type MatchActions =
    | { type: MatchListAvailableActions.FETCH_MATCH_REQUEST }
    | { type: MatchListAvailableActions.FETCH_MATCH_SUCCESS; payload: Matches }
    | { type: MatchListAvailableActions.FETCH_MATCH_FAILURE; payload: string }

export type matchDispatch = React.Dispatch<MatchActions>;

export type LiveMatches = Matches;