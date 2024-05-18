import { Reducer } from "react";
import { UserActions, UserAvailableActions, UserState } from "./types";
import initialData from "./initialData";

export const initialState: UserState = {
    userData: initialData,
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const userReducer: Reducer<UserState, UserActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case UserAvailableActions.FETCH_USER_REQUEST:
        case UserAvailableActions.POST_USER_REQUEST:
        case UserAvailableActions.PATCH_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
            };

        case UserAvailableActions.FETCH_USER_SUCCESS:
        case UserAvailableActions.POST_USER_SUCCESS:
        case UserAvailableActions.PATCH_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
                isError: false,
                errorMessage: "",
            };

        case UserAvailableActions.FETCH_USER_FAILURE:
        case UserAvailableActions.POST_USER_FAILURE:
        case UserAvailableActions.PATCH_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};
