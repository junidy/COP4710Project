import testEvents from '../utils/testEvents.json';
import { AppShell, Center, Group, Stack, Text, Title } from '@mantine/core';
import EventEntry from '../components/EventEntry';
import fetchEvents from '../utils/fetchEvents';
import { useEffect, useState } from 'react';

const EventFeedPage = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
      fetchEvents().then(arr => setEvents(arr));
    }, []);
    return (
      <AppShell
        header={{height: 80}}
      >
        <AppShell.Header>
            <Center>
          <Group>
              <Title order={1}>College Events</Title>
          </Group>
            </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Stack>
            {
              events ? events.map(event => <EventEntry event={event} key={event.event_id} />) : null
            }
          </Stack>
        </AppShell.Main>
      </AppShell>
    );
}

export default EventFeedPage;