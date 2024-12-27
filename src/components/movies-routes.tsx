import { RouteObject } from "react-router-dom";
import { MovieList } from "./movie-list/movie-list";
import { MovieDetail } from "./movie-detail/movie-detail";

export const movieRoutes: RouteObject = {
    path: 'movies',
    children: [
        {
            index: true,
            element: <MovieList />
        },
        {
            path: ':id',
            element: <MovieDetail />
        }
    ]
};