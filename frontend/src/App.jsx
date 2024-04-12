import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// import { RouterProvider } from 'react-router';
import EventFeedPage from './pages/EventFeedPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const getSavedLogin = () => {

}

const getEvents = () => {

}

/*
PAGES:
"/" - homepage
"/login" - login
"/register" - register
"/events" - events homepage
"/profile" - user profile
*/

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
      path: "login",
      element: <LoginPage />
    },
    {
      path: "register",
      element: <RegisterPage />
    },
    {
      path: "events",
      element: <EventFeedPage />,
      // loader: getEvents,
    },
  ]);
  return (
    <MantineProvider defaultColorScheme='light'>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
