import testEvents from '../utils/testEvents.json';
import normalizeFeedJson from '../utils/normalizeFeedJson.js';
import { AppShell, Center, Group, Stack, Text, Title } from '@mantine/core';
import EventEntry from '../components/EventEntry';

const EventFeedPage = () => {
    let events = testEvents.map(event => normalizeFeedJson(event));
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
              events.map(event => <EventEntry event={event} key={event.event_id} />)
            }
          </Stack>
        </AppShell.Main>
      </AppShell>
    );
}

export default EventFeedPage;