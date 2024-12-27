import axios from "axios";
import { MovieDetailResponse, MovieListResponse, MovieRequest } from "../components/typings";

const API_KEY = "40cf0208";

const apiClient = axios.create({
    baseURL: "http://www.omdbapi.com",
    headers: {
        "Content-type": "application/json",
    },
});

export const getMovieList = async (
    request: MovieRequest
): Promise<MovieListResponse> => {
    return await apiClient.get<MovieListResponse>("/", {
        params: { ...request, apikey: API_KEY },
    }).then(response => response.data);
};

export const getMovieDetail = async (
    id: string
): Promise<MovieDetailResponse> => {
    return await apiClient.get<MovieDetailResponse>("/", {
        params: { i: id, apikey: API_KEY },
    }).then(response => response.data);
};