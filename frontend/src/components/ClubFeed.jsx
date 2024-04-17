import { Container, Title, Paper, Stack, Text, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import fetchClubs from '../utils/fetchClubs';
import ClubCard from './ClubCard';

const ClubFeed = () =>
{
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        fetchClubs().then(arr => setClubs(arr) );
    }, []);
    
    return (
        <Container>
            <Title ta="center">Available Clubs</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Center>
                    <Stack>
                        {
                            clubs ? clubs.map(club => <ClubCard clubName={club.name} clubID={club.rso_id} initialJoined={club.is_member} key={club.rso_id}></ClubCard>) : <Text>No clubs available</Text>
                        }
                    </Stack>
                </Center>
            </Paper>
        </Container>
    );
}

export default ClubFeed;