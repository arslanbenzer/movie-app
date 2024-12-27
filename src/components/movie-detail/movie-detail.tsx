import { Badge, Button, Container, Divider, Flex, Image, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../../api/movies-api";
import { IconArrowLeft } from "@tabler/icons-react";


const useMovieDetail = (id: string) => {
    return useQuery({
        queryKey: ["movieDetail", id],
        queryFn: () => getMovieDetail(id),
        staleTime: Infinity
    });
};

export const MovieDetail = () => {
    const { id } = useParams();
    let navigate = useNavigate()

    if (!id) {
        return <Navigate to="/" />
    }

    const { data, isLoading } = useMovieDetail(id);

    if (isLoading || !data) {
        return (
            <Container my="lg">
                <Flex justify="center" mb="xs">
                    <Loader color="blue" />
                </Flex>
            </Container>
        )
    }

    const { Poster, Title, Genre, Year, Runtime, Type, Plot, Actors, Director, imdbRating, imdbVotes, Writer } = data;

    return (
        <Container my="lg">
            <Flex
                gap="xs"
                direction="column"
                justify="flex-start"
                align="flex-start"
            >
                <Flex direction="row" justify="space-between" align="center" w="100%">
                    <Text size="40px">{Title}</Text>
                    <Flex direction="column" gap={2} >
                        <Text size="lg" fw={500}>
                            {imdbRating}/10
                        </Text>
                        <Text>{imdbVotes} votes</Text>
                    </Flex>
                </Flex>
                <Text size="md">{Type} - {Year} - {Runtime}</Text>
                <Image src={Poster} alt={Title} h="200px" w="auto" fit="contain"
                    onError={(event) => {
                        event.currentTarget.src = "/assets/placeholder-image.jpg";
                    }} />

                <Flex gap="xs">
                    {
                        Genre.split(", ").map((genre) => {
                            return (
                                <Badge size="lg" >
                                    {genre}
                                </Badge>)
                        })
                    }
                </Flex>
                <div>
                    <Text size="lg">
                        {Plot}
                    </Text>
                    <Divider my="xs" color="grey" w="100%" />
                    <Text size="md"><b>Cast:</b> {Actors}</Text>
                    <Divider my="xs" color="grey" w="100%" />
                    <Text size="md"><b>Director:</b> {Director}</Text>
                    <Divider my="xs" color="grey" w="100%" />
                    <Text size="md"><b>Writer:</b> {Writer}</Text>
                </div>
                <Button
                    ml="auto"
                    leftSection={<IconArrowLeft size={14} />}
                    onClick={() => navigate(`/movies`)}
                >
                    Go Back
                </Button>
            </Flex>
        </Container>
    )
}