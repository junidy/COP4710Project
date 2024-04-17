import { Button, Flex, Group, Rating, Stack, Text, TextInput, Title } from "@mantine/core";
import CommentCard from "./CommentCard"
import { addComment, getUserId } from "../utils/endpoints";
import { useEffect, useState } from "react";

const onCommentSubmit = (feedback, refreshComments, setEntry) => {
  console.log(feedback);
  addComment(feedback, sessionStorage.getItem('token'))
    .then(response => {
      setEntry('');
      refreshComments();
    })
    .catch(err => console.log(err));
}

const CommentsArea = ({comments, eventId, refreshComments}) => {
  console.log(comments);
  const [userId, setUserId] = useState(0);
  const [entry, setEntry] = useState('');
  const [rating, setRating] = useState(3);
  useEffect(() => {
    (async () => {
      const id = (await getUserId()).data.user_id;
      setUserId(id);
    })();
  }, []);
  return (<>
    <Title order={3}>Comments</Title>
    <TextInput value={entry} onChange={e => setEntry(e.target.value)} placeholder="Type your comment here..." />
    <Flex justify="space-between">
      <Group>
        <Text>Give a rating: </Text>
        <Rating value={rating} onChange={setRating} />
      </Group>
      <Button onClick={() => onCommentSubmit({comment: entry, rating, event_id: eventId}, refreshComments, setEntry)}>Leave a Comment</Button>
    </Flex>
    <Stack>
      {
        comments ? comments.map(comment => <CommentCard isYours={comment.user_id == userId} feedback={comment} refreshComments={refreshComments} key={comment.feedback_id}></CommentCard>) : null
      }
    </Stack>
  </>);
}

export default CommentsArea;