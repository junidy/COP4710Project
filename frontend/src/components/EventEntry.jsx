import { Button, ButtonGroup, Card, CardSection, Flex, Group, Pill, Rating, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EventDetailModal from "./EventDetailModal";
import { MdChevronRight } from "react-icons/md";


const EventEntry = ({event}) => {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(event);
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
          <Text>{event.category}</Text>
          {/* <Rating value={1} readOnly /> */}
        </Group>
        <Flex>
          {
            event.tags.map(tag => <Pill key={tag} style={{marginRight: '10px'}}>{tag}</Pill>)
          }
        </Flex>
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