import React, { useState } from 'react';
import { Card, Text, Group, Button, Rating, Flex, Stack, TextInput } from '@mantine/core';
import { MdOutlineCheck, MdOutlineClear, MdOutlineEdit } from 'react-icons/md';
import { editComment, removeComment } from '../utils/endpoints';

const onCommentEdit = (newComment, refreshComments, setIsEditing) => {
  editComment(newComment.feedback_id, newComment, sessionStorage.getItem('token'))
    .then(res => {
      setIsEditing(false);
      refreshComments();
    })
    .catch(err => console.log(err));
}

const onCommentDelete = (feedbackId, refreshComments) => {
  removeComment(feedbackId, sessionStorage.getItem('token'))
    .then(res => refreshComments())
    .catch(err => console.log(err));
}

const CommentCard = ({ isYours, name, feedback, refreshComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(feedback);
    return (       
      <Card shadow="sm" p="md" radius="md" style={{ marginTop: '0px' }}>
        <Stack direction="column" spacing="xs">
          <Flex justify="space-between">
            <Text fw={700}>{isYours ? 'You' : feedback.name}</Text>
            {      
              isEditing
              ? <Flex align="center">
                <Text>Set a new rating:</Text>
                <Rating value={newComment.rating} onChange={value => setNewComment({...newComment, rating: value})} />
              </Flex>
              : <Rating value={feedback.rating} readOnly />
            }
          </Flex>
          {
            isEditing
            ? <TextInput value={newComment.comment} onChange={e => setNewComment({...newComment, comment: e.target.value})} placeholder="Type your updated comment here..." />
            : <Text size="sm" style={{ lineHeight: 1.5 }}>{feedback.comment}</Text>
          }
          {
            isYours  
            ? <Group justify="flex-end">
              {
                isEditing
                ? <>
                  <Button onClick={() => setIsEditing(false)} color='red'><MdOutlineClear />Cancel edit</Button>
                  <Button onClick={() => onCommentEdit(newComment, refreshComments, setIsEditing)}><MdOutlineCheck />Save edit</Button>
                </>
                : <>
                  <Button onClick={() => setIsEditing(true)}><MdOutlineEdit />Edit</Button>
                  <Button onClick={() => onCommentDelete(feedback.feedback_id, refreshComments)} color='red'><MdOutlineClear />Delete</Button>
                </>
              }
            </Group>
            : null
          }
        </Stack>
      </Card>
    );
  };

export default CommentCard;