import { Button, ButtonGroup, Card, CardSection, Group, Rating, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EventDetailModal from "./EventDetailModal";
import { MdChevronRight } from "react-icons/md";


const EventEntry = ({event}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return <>
    <Card
      shadow="sm"
      // variant="default"
      cursor="pointer"
      onClick={open}
      // fullWidth
      // h="min-content"
      // rightSection={<MdChevronRight size="48"/>}
    >
      <Stack w="100vw">
        <Group w="100%">
          <Title order={3}>
            {event.title}
          </Title>
        </Group>
        <Rating />
      </Stack>
    </Card>
    <EventDetailModal
      event={event}
      opened={opened}
      onClose={close}
    />
  </>;
}

export default EventEntry;