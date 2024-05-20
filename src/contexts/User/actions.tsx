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
            throw new Error("Failed to fetch Teams");
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
            payload: "Unable to load Teams"
        })
    }
};

export const fetchUserPreference = async (
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
            throw new Error("Failed to fetch Teams");
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
            payload: "Unable to load Teams"
        })
    }
};
export const postUser = async (dispatch: UserDispatch, userData: { name: string, email: string, password: string }) => {
    try {
        dispatch({ type: UserAvailableActions.POST_USER_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        const data = await response.json();
        dispatch({
            type: UserAvailableActions.POST_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: UserAvailableActions.POST_USER_FAILURE,
            payload: "Unable to create user"
        })
    }
};

export const postUserSignIn = async (dispatch: UserDispatch, credentials: { email: string, password: string }) => {
    try {
        dispatch({ type: UserAvailableActions.POST_USER_SIGNIN_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            throw new Error("Failed to sign in");
        }
        const data = await response.json();
        dispatch({
            type: UserAvailableActions.POST_USER_SIGNIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: UserAvailableActions.POST_USER_SIGNIN_FAILURE,
            payload: "Unable to sign in"
        })
    }
};

export const patchUserPassword = async (dispatch: UserDispatch, passwordData: { current_password: string, new_password: string }) => {
    try {
        dispatch({ type: UserAvailableActions.PATCH_USER_PASSWORD_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/user/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData)
        });
        if (!response.ok) {
            throw new Error("Failed to update password");
        }
        dispatch({
            type: UserAvailableActions.PATCH_USER_PASSWORD_SUCCESS,
            payload: passwordData, // Assuming backend returns the same data
        });
    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: UserAvailableActions.PATCH_USER_PASSWORD_FAILURE,
            payload: "Unable to update password"
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