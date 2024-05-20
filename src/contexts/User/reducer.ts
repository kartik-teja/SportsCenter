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
        case UserAvailableActions.FETCH_USER_PREFERENCE_REQUEST:
        case UserAvailableActions.POST_USER_REQUEST:
        case UserAvailableActions.POST_USER_SIGNIN_REQUEST:
        case UserAvailableActions.PATCH_USER_PASSWORD_REQUEST:
        case UserAvailableActions.PATCH_USER_PREFERENCE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
            };

        case UserAvailableActions.FETCH_USER_SUCCESS:
        case UserAvailableActions.FETCH_USER_PREFERENCE_SUCCESS:
        case UserAvailableActions.POST_USER_SUCCESS:
        case UserAvailableActions.POST_USER_SIGNIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
                isError: false,
                errorMessage: "",
            };
        case UserAvailableActions.PATCH_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
            };

        case UserAvailableActions.PATCH_USER_PREFERENCE_SUCCESS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    preferences: action.payload.preferences,
                },
                isLoading: false,
                isError: false,
                errorMessage: "",
            };


        case UserAvailableActions.FETCH_USER_FAILURE:
        case UserAvailableActions.FETCH_USER_PREFERENCE_FAILURE:
        case UserAvailableActions.POST_USER_FAILURE:
        case UserAvailableActions.POST_USER_SIGNIN_FAILURE:
        case UserAvailableActions.PATCH_USER_PASSWORD_FAILURE:
        case UserAvailableActions.PATCH_USER_PREFERENCE_FAILURE:
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
