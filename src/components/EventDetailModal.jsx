import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Divider, Text, Title, Group } from '@mantine/core';
import { MdEmail, MdLocalPhone, MdPerson } from 'react-icons/md';

const EventDetailModal = ({event, opened, onClose}) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={<h3>{event.title}</h3>}
        centered
        size="xl"
      >
        <p dangerouslySetInnerHTML={{__html: event.description}}></p>
        <Divider />
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

      </Modal>
    </>
  );
}

export default EventDetailModal;