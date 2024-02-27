import { Button, Card, CardSection, Rating, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EventDetailModal from "./EventDetailModal";


const EventEntry = ({event}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return <Card
    shadow="sm"
  >
    <Title order={3}>
      {event.title}
    </Title>
    <EventDetailModal
      event={event}
      opened={opened}
      onClose={close}
    />
    <Rating />
    <Button onClick={open}>See details</Button>
  </Card>;
}

export default EventEntry;