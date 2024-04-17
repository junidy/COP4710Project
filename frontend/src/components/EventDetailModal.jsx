import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Divider, Text, Title, Group, AppShell, AppShellAside, AppShellSection, AppShellHeader, Grid, GridCol, Anchor, Stack } from '@mantine/core';
import { MdEmail, MdLocalPhone, MdPerson, MdLocationPin, MdLink,  } from 'react-icons/md';
import { Column } from '@doist/reactist';
import date from 'date-and-time';
import day_of_week from 'date-and-time/plugin/day-of-week';
import { getPlaceDetails } from '../utils/placeDetails';
import CommentCard from './CommentCard';
import { getComments } from '../utils/endpoints';
import { useState, useEffect } from 'react';
import CommentsArea from './CommentsArea';
date.plugin(day_of_week);

const parseDate = str => {
  const dt = new Date(str)
  return {
    date: date.format(dt, 'ddd, MMM DD, YYYY'),
    time: date.format(dt, 'h:mm A'),
  };
};

const EventDetailModal = ({event, comments, opened, onClose}) => {
  // const location = getPlaceDetails(event.location_id);
  const [eventComments, setEventComments] = useState([]);
  const refreshComments = () => {
    getComments(event.event_id)
      .then(response => {
        // Assuming the response is an object with a comments property that is an array
        if (response && Array.isArray(response.comments)) {
          setEventComments(response.comments);
        } else {
          console.error('Comments not found or not in expected format:', response);
        }
      })
      .catch(error => {
        console.error("Failed to load comments:", error);
      });
  }
  useEffect(() => {
    refreshComments();
  }, [event.event_id]);  // Dependency array to refetch when event ID changes

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={<>
          <Text fw={800} size="2.2em">{event.title}</Text>
          <Group gap="8px">
            <Text fw={500} size="1.5em">{parseDate(event.start_time).date}</Text>
            <Text size="1.5em">from</Text>
            <Text fw={500} size="1.5em">{parseDate(event.start_time).time}</Text>
            <Text size="1.5em">to</Text>
            <Text fw={500} size="1.5em">{parseDate(event.end_time).time}</Text>
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
            <CommentsArea comments={eventComments} eventId={event.event_id} refreshComments={refreshComments}/>
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
              <Text>{event.location_id}</Text>
            </Group>
          </GridCol>
        <Divider />
        </Grid>
      </Modal>
    </>
  );
}

export default EventDetailModal;