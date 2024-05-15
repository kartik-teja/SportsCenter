import { API_ENDPOINT } from "../../config/constants";

import { MatchListAvailableActions, matchDispatch } from './types';

export const fetchMatch = async (
    dispatch: matchDispatch,
) => {
    try {
        dispatch({ type: MatchListAvailableActions.FETCH_MATCH_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/matches`,
            {
                headers: {

                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Matches");
        }

        const data = await response.json();
        dispatch({
            type: MatchListAvailableActions.FETCH_MATCH_SUCCESS,
            payload: data,
        });
        console.dir(data);
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: MatchListAvailableActions.FETCH_MATCH_FAILURE,
            payload: "Unable to load Mathces"
        })
    }
};