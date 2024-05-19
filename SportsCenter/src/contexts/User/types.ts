import React from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    preferences: object | unknown;
}

export interface UserState {
    userData: User;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export enum UserAvailableActions {
    FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_FAILURE = "FETCH_USER_FAILURE",

    FETCH_USER_PREFERENCE_REQUEST = "FETCH_USER_PREFERENCE_REQUEST",
    FETCH_USER_PREFERENCE_SUCCESS = "FETCH_USER_PREFERENCE_SUCCESS",
    FETCH_USER_PREFERENCE_FAILURE = "FETCH_USER_PREFERENCE_FAILURE",

    POST_USER_REQUEST = "POST_USER_REQUEST",
    POST_USER_SUCCESS = "POST_USER_SUCCESS",
    POST_USER_FAILURE = "POST_USER_FAILURE",

    POST_USER_SIGNIN_REQUEST = "POST_USER_SIGNIN_REQUEST",
    POST_USER_SIGNIN_SUCCESS = "POST_USER_SIGNIN_SUCCESS",
    POST_USER_SIGNIN_FAILURE = "POST_USER_SIGNIN_FAILURE",

    PATCH_USER_PASSWORD_REQUEST = "PATCH_USER_PASSWORD_REQUEST",
    PATCH_USER_PASSWORD_SUCCESS = "PATCH_USER_PASSWORD_SUCCESS",
    PATCH_USER_PASSWORD_FAILURE = "PATCH_USER_PASSWORD_FAILURE",

    PATCH_USER_PREFERENCE_REQUEST = "PATCH_USER_PREFERENCE_REQUEST",
    PATCH_USER_PREFERENCE_SUCCESS = "PATCH_USER_PREFERENCE_SUCCESS",
    PATCH_USER_PREFERENCE_FAILURE = "PATCH_USER_PREFERENCE_FAILURE",
}


export type UserPayload = Omit<User, "id">;


export type UserActions =
    | { type: UserAvailableActions.FETCH_USER_REQUEST }
    | { type: UserAvailableActions.FETCH_USER_SUCCESS; payload: User }
    | { type: UserAvailableActions.FETCH_USER_FAILURE; payload: string }

    | { type: UserAvailableActions.FETCH_USER_PREFERENCE_REQUEST }
    | { type: UserAvailableActions.FETCH_USER_PREFERENCE_SUCCESS; payload: User }
    | { type: UserAvailableActions.FETCH_USER_PREFERENCE_FAILURE; payload: string }

    | { type: UserAvailableActions.POST_USER_REQUEST }
    | { type: UserAvailableActions.POST_USER_SUCCESS; payload: User }
    | { type: UserAvailableActions.POST_USER_FAILURE; payload: string }

    | { type: UserAvailableActions.POST_USER_SIGNIN_REQUEST }
    | { type: UserAvailableActions.POST_USER_SIGNIN_SUCCESS; payload: User }
    | { type: UserAvailableActions.POST_USER_SIGNIN_FAILURE; payload: string }

    | { type: UserAvailableActions.PATCH_USER_PASSWORD_REQUEST }
    | { type: UserAvailableActions.PATCH_USER_PASSWORD_SUCCESS; payload: { current_password: string, new_password: string } }
    | { type: UserAvailableActions.PATCH_USER_PASSWORD_FAILURE; payload: string }

    | { type: UserAvailableActions.PATCH_USER_PREFERENCE_REQUEST }
    | { type: UserAvailableActions.PATCH_USER_PREFERENCE_SUCCESS; payload: { preferences: JSON } }
    | { type: UserAvailableActions.PATCH_USER_PREFERENCE_FAILURE; payload: string };

export type UserDispatch = React.Dispatch<UserActions>;
