import { CloseButton, Container, Flex, Grid, Input, Loader, Pagination, Select, Text } from "@mantine/core"
import { MovieCard } from "../movie-card/movie-card"
import { useQuery } from "@tanstack/react-query";
import { getMovieList } from "../../api/movies-api";
import { MovieListItem, MovieRequest, MovieType } from "../typings";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import moment from "moment";

const useMovies = (currentPage: number, s: string, type: MovieType | null, y: string | null) => {
    const request: MovieRequest = {
        page: currentPage, s, type, y,
    }
    return useQuery({
        queryKey: ["movies", request],
        queryFn: () => getMovieList(request),
        staleTime: 400
    });
};

const typeOptions = Object.keys(MovieType).map((key) => ({
    value: key,
    label: MovieType[key as keyof typeof MovieType],
}));

const MIN_YEAR = 1960;

const yearOptions = Array.from({ length: moment().year() - MIN_YEAR + 1 }, (_, i) => i + MIN_YEAR).reverse();

export const MovieList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("Pokemon");
    const [type, setType] = useState<MovieType | null>(null);
    const [year, setYear] = useState<string | null>("");
    const [searchValue] = useDebounce(searchText, 400);

    const { data, isLoading } = useMovies(currentPage, searchValue, type, year);

    const movieList = data?.Search;

    if (isLoading || !data) {
        return (
            <Container my="lg">
                <Flex justify="center" mb="xs">
                    <Loader color="blue" />
                </Flex>
            </Container>
        )
    }

    return (
        <div>
            <Container my="lg">
                <Flex gap="md" align="end" mb="xs">
                    <Input.Wrapper label="Search">
                        <Input
                            placeholder="Search Title"
                            onChange={(event) =>
                                setSearchText(event.target.value)}
                            value={searchText}
                            rightSectionPointerEvents="all"
                            rightSection={
                                <CloseButton
                                    aria-label="Clear input"
                                    onClick={() => setSearchText('')}
                                    style={{ display: searchText ? undefined : 'none' }}
                                />
                            } />
                    </Input.Wrapper>
                    <Input.Wrapper label="Type">
                        <Select
                            data={typeOptions}
                            value={type}
                            onChange={(_value) => setType(_value as MovieType)}
                            clearable
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Year">
                        <Select
                            data={yearOptions.map(String)}
                            value={year}
                            onChange={(_value) => setYear(_value)}
                            clearable
                            searchable
                        />
                    </Input.Wrapper>
                </Flex>
                <Grid align="stretch">
                    {
                        movieList?.length ?
                            movieList.map((movie: MovieListItem) => {
                                return (
                                    <Grid.Col span={{ base: 12, lg: 4, xs: 6 }} key={movie.imdbID}>
                                        <MovieCard movie={movie} />
                                    </Grid.Col>
                                )
                            })
                            : (<Text m="md">No results</Text>)
                    }
                </Grid>
                <Pagination total={Math.ceil(parseInt(data?.totalResults) / 10)} value={currentPage} onChange={setCurrentPage} mt="sm" boundaries={3} />
            </Container>
        </div>
    );
}