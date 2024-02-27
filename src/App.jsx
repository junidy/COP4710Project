import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EventDetailModal from './components/EventDetailModal';
import EventFeedPage from './pages/EventFeedPage';


function App() {
  return (
    <MantineProvider>
      {/* <EventDetailModal /> */}
      <EventFeedPage />
    </MantineProvider>
  )
}

export default App
