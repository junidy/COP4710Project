import { useState } from 'react';
import { Button, Modal, TextInput, Group } from '@mantine/core';
import { createRSO, joinRSO } from "../utils/endpoints.js"


const CreateClubButton = () => {
  const [modalOpened, setModalOpened] = useState(false);  // State to manage modal visibility
  const [clubName, setClubName] = useState('');          // State to store the input from the user

  const handleSubmit = () => {
    const rsoDetails = {
      name: clubName
    }

    createRSO(rsoDetails, sessionStorage.getItem('token'))
      .then(results => {
        setModalOpened(false);
        joinRSO(results.clubID, sessionStorage.getItem('token'))
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
    console.log('Club Name:', clubName); // Here you can integrate API to create club
  };

  return (
    <div style={{ 'paddingTop': '15px' }}>
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