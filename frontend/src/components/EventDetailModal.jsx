import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Divider, Text, Title, Group, AppShell, AppShellAside, AppShellSection, AppShellHeader, Grid, GridCol, Anchor } from '@mantine/core';
import { MdEmail, MdLocalPhone, MdPerson, MdLocationPin, MdLink,  } from 'react-icons/md';
import { Column } from '@doist/reactist';
import date from 'date-and-time';
import day_of_week from 'date-and-time/plugin/day-of-week';
import { getPlaceDetails } from '../utils/placeDetails';
date.plugin(day_of_week);

const parseDate = str => {
  return {
    date: date.transform(str, 'ddd, DD MMM YYYY HH:mm:ss Z', 'dddd, MMMM D, YYYY'),
    time: date.transform(str, 'ddd, DD MMM YYYY HH:mm:ss Z', 'h:mm A'),
  };
};

const EventDetailModal = ({event, comments, opened, onClose}) => {
  const location = getPlaceDetails("ChIJpWQOoGZo54gRX0K6_CmyVe8");
  // const location = getPlaceDetails(event.location_id);
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={<>
          <Text order={2}>{event.title}</Text>
          <Group>
            <Text>{parseDate(event.start_time).date} from {parseDate(event.start_time).time} to {parseDate(event.end_time).time}</Text>
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
              <Text>{event.contact_name}</Text>
            </Group>
            <Group>
              <MdLocalPhone />
              <Text>{event.contact_phone}</Text>
            </Group>
            <Group>
              <MdEmail />
              <Text>{event.contact_email}</Text>
            </Group>
            <Divider />
            <Title order={3}>Location</Title>
            <Group>
              <MdLocationPin />
              <Text></Text>
            </Group>
            <Group>
              <MdLocationPin />
              <Text></Text>
            </Group>
            <Group>
              <MdLink />
              <Anchor inline={true}></Anchor>
            </Group>
          </GridCol>
        <Divider />
        </Grid>
      </Modal>
    </>
  );
}

export default EventDetailModal;