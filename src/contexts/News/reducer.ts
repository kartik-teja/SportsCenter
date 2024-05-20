import { Reducer } from "react";

import { LiveNewsState, NewsActions, NewsListAvailableActions } from "./types";
import initialData from "./initialData";



export const initialState: LiveNewsState = {
    newsData: initialData,
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export const newsReducer: Reducer<LiveNewsState, NewsActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case NewsListAvailableActions.FETCH_NEWS_REQUEST:
            return { ...state, isLoading: true };
        case NewsListAvailableActions.FETCH_NEWS_SUCCESS:
            return { ...state, isLoading: false, newsData: action.payload };
        case NewsListAvailableActions.FETCH_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}