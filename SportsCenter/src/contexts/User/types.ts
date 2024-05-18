import React from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    preferences: Record<string, JSON>;
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
    POST_USER_REQUEST = "POST_USER_REQUEST",
    POST_USER_SUCCESS = "POST_USER_SUCCESS",
    POST_USER_FAILURE = "POST_USER_FAILURE",
    PATCH_USER_REQUEST = "PATCH_USER_REQUEST",
    PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS",
    PATCH_USER_FAILURE = "PATCH_USER_FAILURE",
}


export type UserPayload = Omit<User, "id">;


export type UserActions =
    | { type: UserAvailableActions.FETCH_USER_REQUEST }
    | { type: UserAvailableActions.FETCH_USER_SUCCESS; payload: User }
    | { type: UserAvailableActions.FETCH_USER_FAILURE; payload: string }
    | { type: UserAvailableActions.POST_USER_REQUEST }
    | { type: UserAvailableActions.POST_USER_SUCCESS; payload: User }
    | { type: UserAvailableActions.POST_USER_FAILURE; payload: string }
    | { type: UserAvailableActions.PATCH_USER_REQUEST }
    | { type: UserAvailableActions.PATCH_USER_SUCCESS; payload: User }
    | { type: UserAvailableActions.PATCH_USER_FAILURE; payload: string };


export type UserDispatch = React.Dispatch<UserActions>;
