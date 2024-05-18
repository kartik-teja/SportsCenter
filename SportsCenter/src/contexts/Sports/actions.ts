import { API_ENDPOINT } from "../../config/constants";

import { SportListAvailableActions, SportDispatch } from './types';

export const fetchMatch = async (
    dispatch: SportDispatch,
) => {
    try {
        dispatch({ type: SportListAvailableActions.FETCH_SPORTS_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/sports`,
            {
                headers: {

                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Sports");
        }

        const data = await response.json();
        dispatch({
            type: SportListAvailableActions.FETCH_SPORTS_SUCCESS,
            payload: data,
        });
        console.dir(data);
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: SportListAvailableActions.FETCH_SPORTS_FAILURE,
            payload: "Unable to load Sports"
        })
    }
};