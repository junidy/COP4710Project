import { Navbar } from '../components/Navbar/Navbar';
import { FooterSocial } from '../components/FooterSocial/FooterSocial';
import EventFeed from '../components/EventFeed';
import CreateEventButton from '../components/CreateEventButton/CreateEventButton';
import { Center } from '@mantine/core';

const EventFeedPage = () => {
    return (
      <div>
        <Navbar></Navbar>
        <EventFeed></EventFeed>
        <Center>
          <CreateEventButton></CreateEventButton>
        </Center>
        <FooterSocial></FooterSocial>
      </div>
    );
}

export default EventFeedPage;