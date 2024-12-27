import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';

import './movie-card.scss'
import { MovieListItem } from '../typings';
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
    movie: MovieListItem;
};

export const MovieCard = ({ ...props }: MovieCardProps) => {
    let navigate = useNavigate()

    const { Poster, Title, Type, Year, imdbID } = props.movie;

    return (
        <Card withBorder radius="lg" p="md" className="card" >
            <Card.Section className="section" mt="md">
                <Image src={Poster} alt={Title} height={180} fit="contain" onError={(event) => {
                    event.currentTarget.src = "/assets/placeholder-image.jpg";
                }} />
                <Text fz="xl" fw={500} mt="xs" className='title'>
                    {Title}
                </Text>
                <Group justify="apart" mt="sm" align='center'>
                    <Badge size="lg" variant="light">
                        {Year}
                    </Badge>
                    <Text fw={500} c="dimmed">ID:  {imdbID} </Text>
                </Group>
            </Card.Section>
            <Group className='details-button'>
                <Button radius="md" style={{ flex: 1 }} variant="default" onClick={() => navigate(`/movies/${imdbID}`)} >
                    Show details
                </Button>
            </Group>
        </Card>
    );
}