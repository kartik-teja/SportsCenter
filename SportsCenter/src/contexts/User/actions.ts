import { API_ENDPOINT } from "../../config/constants";
import {
    UserAvailableActions,
    UserDispatch,
    UserPayload,
    UserState,
} from "./types";

export const fetchUser = async (dispatch: UserDispatch, userId: number) => {
    dispatch({ type: UserAvailableActions.FETCH_USER_REQUEST });

    try {
        const response = await fetch(`${API_ENDPOINT}/users/${userId}`);
        const data: UserState = await response.json();

        if (response.ok) {
            dispatch({ type: UserAvailableActions.FETCH_USER_SUCCESS, payload: data.userData });
        } else {
            dispatch({ type: UserAvailableActions.FETCH_USER_FAILURE, payload: data.errorMessage });
        }
    } catch (error) {
        dispatch({ type: UserAvailableActions.FETCH_USER_FAILURE, payload: error.message });
    }
};

export const postUser = async (dispatch: UserDispatch, userPayload: UserPayload) => {
    dispatch({ type: UserAvailableActions.POST_USER_REQUEST });

    try {
        const response = await fetch(`${API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPayload),
        });
        const data: UserState = await response.json();

        if (response.ok) {
            dispatch({ type: UserAvailableActions.POST_USER_SUCCESS, payload: data.userData });
        } else {
            dispatch({ type: UserAvailableActions.POST_USER_FAILURE, payload: data.errorMessage });
        }
    } catch (error) {
        dispatch({ type: UserAvailableActions.POST_USER_FAILURE, payload: error.message });
    }
};

export const patchUser = async (dispatch: UserDispatch, userId: number, userPayload: Partial<UserPayload>) => {
    dispatch({ type: UserAvailableActions.PATCH_USER_REQUEST });

    try {
        const response = await fetch(`${API_ENDPOINT}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPayload),
        });
        const data: UserState = await response.json();

        if (response.ok) {
            dispatch({ type: UserAvailableActions.PATCH_USER_SUCCESS, payload: data.userData });
        } else {
            dispatch({ type: UserAvailableActions.PATCH_USER_FAILURE, payload: data.errorMessage });
        }
    } catch (error) {
        dispatch({ type: UserAvailableActions.PATCH_USER_FAILURE, payload: error.message });
    }
};
