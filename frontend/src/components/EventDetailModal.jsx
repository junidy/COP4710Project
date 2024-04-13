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
date.plugin(day_of_week);

const parseDate = str => {
  return {
    date: date.transform(str, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'dddd, MMMM D, YYYY'),
    time: date.transform(str, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'h:mm A'),
  };
};

const EventDetailModal = ({event, comments, opened, onClose}) => {
  // const location = getPlaceDetails(event.location_id);
  const [eventComments, setEventComments] = useState([]);

  useEffect(() => {
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
  }, [event.event_id]);  // Dependency array to refetch when event ID changes

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
            <Stack>
              {
                eventComments ? eventComments.map(comment => <CommentCard name={comment.name} comment={comment.comment} key={comment.feedback_id}></CommentCard>) : null
              }
            </Stack>
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