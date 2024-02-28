import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Divider, Text, Title, Group, AppShell, AppShellAside, AppShellSection, AppShellHeader, Grid, GridCol, Anchor } from '@mantine/core';
import { MdEmail, MdLocalPhone, MdPerson, MdLocationPin, MdLink,  } from 'react-icons/md';
import { Column } from '@doist/reactist';
import date from 'date-and-time';
import day_of_week from 'date-and-time/plugin/day-of-week';
date.plugin(day_of_week);

const parseDate = str => {
  return {
    date: date.transform(str, 'ddd, DD MMM YYYY HH:mm:ss Z', 'dddd, MMMM D, YYYY'),
    time: date.transform(str, 'ddd, DD MMM YYYY HH:mm:ss Z', 'h:mm A'),
  };
};

const NewEventModal = ({event, comments, opened, onClose}) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={<>
          <Title order={2}>{event.title}</Title>
          <Group>
            <Text>{parseDate(event.time.start).date} from {parseDate(event.time.start).time} to {parseDate(event.time.end).time}</Text>
          </Group>
          <Divider />
        </>}
        // withCloseButton={false}
        centered
        size="90%"
      >
        <Grid>
          <GridCol span={8}>
            <p dangerouslySetInnerHTML={{__html: event.description}}></p>
            <Divider />
            <Title order={3}>Comments</Title>
          </GridCol>
          <GridCol span={4}>
            <Title order={3}>Contact Info</Title>
            <Group>
              <MdPerson />
              <Text>{event.contact.name}</Text>
            </Group>
            <Group>
              <MdLocalPhone />
              <Text>{event.contact.phone}</Text>
            </Group>
            <Group>
              <MdEmail />
              <Text>{event.contact.email}</Text>
            </Group>
            <Divider />
            <Title order={3}>Location</Title>
            <Group>
              <MdLocationPin />
              <Text>{event.location.name}</Text>
            </Group>
            <Group>
              <MdLocationPin />
              <Text>{event.location.address}</Text>
            </Group>
            <Group>
              <MdLink />
              <Anchor inline={true}>{event.location.url}</Anchor>
            </Group>
          </GridCol>
        <Divider />
        </Grid>
      </Modal>
    </>
  );
}

export default NewEventModal;