import React from "react";
import { team } from "../Matches/types"
import { sport } from "../Sports/types";

export interface LiveNewsState {
    newsData: News[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export enum NewsListAvailableActions {
    FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST",
    FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS",
    FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE"
}



export type News = {
    id: number;
    title: string;
    thumbnail: string;
    sport: sport;
    date: string;
    summary: string;
    content: string;
    teams: team[]
}


export type NewsPayload = Omit<News, "id">;

export type NewsActions =
    | { type: NewsListAvailableActions.FETCH_NEWS_REQUEST }
    | { type: NewsListAvailableActions.FETCH_NEWS_SUCCESS; payload: News[] }
    | { type: NewsListAvailableActions.FETCH_NEWS_FAILURE; payload: string }

export type NewsDispatch = React.Dispatch<NewsActions>;
