import { Container, Title, Paper, Stack, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import fetchEvents from '../utils/fetchEvents';
import EventEntry from './EventEntry';

const EventFeed = () =>
{
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents().then(arr => setEvents(arr));
    }, []);

    return (
        <Container>
            <Title ta="center">College Events</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Stack>
                {
                events ? events?.map(event => <EventEntry event={event} key={event.event_id} />) : <Text>No events to display</Text>
                }
            </Stack>
            </Paper>
        </Container>
    );
}

export default EventFeed;