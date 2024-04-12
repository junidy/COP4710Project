import React, { useState } from 'react';
import { Card, Text, Button, Group } from '@mantine/core';

const ClubCard = ({ clubName, initialJoined = false }) => {
  // Manage the joined state with useState
  const [hasJoined, setHasJoined] = useState(initialJoined);

  // Toggle the joined state
  const toggleJoin = () => {
    setHasJoined(!hasJoined);
  };

  return (
    <Card shadow="sm" p="lg" style={{ position: 'relative', width: 300 }}>
      <Group position="apart" style={{ width: '100%', alignItems: 'center' }}>
        <Text weight={500}>{clubName}</Text>
        <Button
          variant="filled"
          color={hasJoined ? "red" : "blue"}
          onClick={toggleJoin}
        >
          {hasJoined ? 'Leave' : 'Join'}
        </Button>
      </Group>
    </Card>
  );
};

export default ClubCard;
