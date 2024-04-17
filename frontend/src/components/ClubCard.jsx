import React, { useState } from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import joinRSO from '../utils/joinRSO';
import leaveRSO from '../utils/leaveRSO';

const ClubCard = ({ clubName, clubID, initialJoined = false }) => {
  // Manage the joined state with useState
  const [hasJoined, setHasJoined] = useState(initialJoined);

  // Toggle the joined state
  const toggleJoin = () => {
    if (hasJoined)
    {
      leaveRSO(clubID);
      setHasJoined(false);
    }
    else
    {
      joinRSO(clubID);
      setHasJoined(true);
    }
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
