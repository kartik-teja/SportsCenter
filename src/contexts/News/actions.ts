import { API_ENDPOINT } from "../../config/constants";

import { NewsListAvailableActions, NewsDispatch } from './types';

export const fetchNews = async (
    dispatch: NewsDispatch,
) => {
    try {
        dispatch({ type: NewsListAvailableActions.FETCH_NEWS_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/articles`,
            {
                headers: {

                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch News");
        }

        const data = await response.json();
        dispatch({
            type: NewsListAvailableActions.FETCH_NEWS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        console.error("Operation failed:", error);
        dispatch({
            type: NewsListAvailableActions.FETCH_NEWS_FAILURE,
            payload: "Unable to load NEWS"
        })
    }
};
