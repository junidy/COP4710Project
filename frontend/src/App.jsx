import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// import { RouterProvider } from 'react-router';
import EventFeedPage from './pages/EventFeedPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SplashPage from './pages/SplashPage';

const getSavedLogin = () => {

}

const getEvents = () => {

}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SplashPage />,
      // loader: getSavedLogin,
      // children: [
      // ],
    },
    {
      path: "events",
      element: <EventFeedPage />,
      // loader: getEvents,
    },
  ]);
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
