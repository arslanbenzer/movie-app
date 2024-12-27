export interface MovieListResponse {
    Search: MovieListItem[]
    totalResults: string
}

export interface MovieListItem {
    "Title": string
    "imdbID": string
    "Year": string
    "Type": string
    "Poster": string
}

export interface MovieRequest {
    y?: string | null
    s: string
    type?: MovieType | null
    page: number
}

export enum MovieType {
    movie = "Movie",
    series = "Series",
    episode = "Episodes",
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetailResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}