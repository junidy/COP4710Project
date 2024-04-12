import { Navbar } from '../components/Navbar/Navbar';
import { FooterSocial } from '../components/FooterSocial/FooterSocial';
import EventFeed from '../components/EventFeed';

const EventFeedPage = () => {
    return (
      <div>
        <Navbar></Navbar>
        <EventFeed></EventFeed>
        <FooterSocial></FooterSocial>
      </div>
    );
}

export default EventFeedPage;