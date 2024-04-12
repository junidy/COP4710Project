import { Container, Title, Paper, Stack, Text, Center } from '@mantine/core';
import ClubCard from './ClubCard';

const ClubFeed = () =>
{
    const clubs = [
        {name: "Axe Throwing Club", id: 0},
        {name: "Clown Club", id: 1},
        {name: "Computer Science Club", id: 2},
        {name: "Chess Club", id: 3}
    ];
    return (
        <Container>
            <Title ta="center">Available Clubs</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Center>
                    <Stack>
                        {
                            clubs ? clubs.map(club => <ClubCard clubName={club.name} hasJoined={false} key={club.id}></ClubCard>) : <Text>No clubs available</Text>
                        }
                    </Stack>
                </Center>
            </Paper>
        </Container>
    );
}

export default ClubFeed;