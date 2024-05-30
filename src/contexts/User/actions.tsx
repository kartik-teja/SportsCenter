import { API_ENDPOINT } from "../../config/constants";

import { UserAvailableActions, UserDispatch } from './types';

export const fetchUser = async (
    dispatch: UserDispatch,
) => {
    try {
        dispatch({ type: UserAvailableActions.FETCH_USER_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/users`,
            {
                headers: {

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

export const fetchUserPreference = async (
    dispatch: UserDispatch,
) => {
    try {
        dispatch({ type: UserAvailableActions.FETCH_USER_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/user/preferences`,
            {
                headers: {

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


export const patchUserPreference = async (dispatch: UserDispatch, preferenceData: { preferences: JSON }) => {
    try {
        dispatch({ type: UserAvailableActions.PATCH_USER_PREFERENCE_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/user/preference`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferenceData)
        });
        if (!response.ok) {
            throw new Error("Failed to update user preferences");
        }
        dispatch({
            type: UserAvailableActions.PATCH_USER_PREFERENCE_SUCCESS,
            payload: preferenceData,
        });
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: UserAvailableActions.PATCH_USER_PREFERENCE_FAILURE,
            payload: "Unable to update user preferences"
        })
    }
};