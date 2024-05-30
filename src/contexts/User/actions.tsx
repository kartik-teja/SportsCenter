import { API_ENDPOINT } from "../../config/constants";

import { UserAvailableActions, UserDispatch } from './types';

const authToken = localStorage.getItem('authToken');

export const fetchUser = async (
    dispatch: UserDispatch,
) => {
    try {
        dispatch({ type: UserAvailableActions.FETCH_USER_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/users`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch User Preference");
        }
        const data = await response.json();

        dispatch({
            type: UserAvailableActions.FETCH_USER_SUCCESS,
            payload: data,
        });
        console.dir(data);
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: UserAvailableActions.FETCH_USER_FAILURE,
            payload: "Unable to load User Preference"
        })
    }
};
