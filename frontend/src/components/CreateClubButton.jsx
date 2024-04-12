import { useState } from 'react';
import { Button, Modal, TextInput, Group } from '@mantine/core';


const CreateClubButton = () => {
    const [modalOpened, setModalOpened] = useState(false);  // State to manage modal visibility
    const [clubName, setClubName] = useState('');          // State to store the input from the user
  
    const handleSubmit = () => {
      console.log('Club Name:', clubName); // Here you can integrate API to create club
      setModalOpened(false);              // Close modal after submit
    };
  
    return (
      <div style={{ 'padding-top': '15px' }}>
        <Button onClick={() => setModalOpened(true)}>Create Club</Button>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Create a New Club"
        >
          <form onSubmit={(e) => {
            e.preventDefault();  // Prevent default form submission
            handleSubmit();
          }}>
            <TextInput
              label="Club Name"
              placeholder="Enter club name"
              required
              value={clubName}
              onChange={(event) => setClubName(event.currentTarget.value)}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Modal>
      </div>
    );
  };

export default CreateClubButton;