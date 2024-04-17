import React from 'react';
import { Card, Text, Group } from '@mantine/core';

const CommentCard = ({ name, comment }) => {
    console.log(comment);
    return (
      <Card shadow="sm" p="md" radius="md" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Group direction="column" spacing="xs">
          <Text weight={500}>{name}</Text>
          <Text size="sm" style={{ lineHeight: 1.5 }}>{comment}</Text>
        </Group>
      </Card>
    );
  };

export default CommentCard;