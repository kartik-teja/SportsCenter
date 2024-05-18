import { API_ENDPOINT } from "../../config/constants";

import { TeamListAvailableActions, TeamDispatch } from './types';

export const fetchMatch = async (
    dispatch: TeamDispatch,
) => {
    try {
        dispatch({ type: TeamListAvailableActions.FETCH_TEAM_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/teams`,
            {
                headers: {

                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Teams");
        }

        const data = await response.json();
        dispatch({
            type: TeamListAvailableActions.FETCH_TEAM_SUCCESS,
            payload: data,
        });
        console.dir(data);
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: TeamListAvailableActions.FETCH_TEAM_FAILURE,
            payload: "Unable to load Teams"
        })
    }
};