import { Group, Button, Text, Box, Burger, Drawer, ScrollArea, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classes from './Navbar.module.css';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const nav = useNavigate();

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Text size="md" style={{ flex: 1 }}>ClubHub</Text>

        <Group visibleFrom='sm' h='100%' gap={0}>
          <Center> {/* Centered links */}
            <a href="/" className={classes.link}>
              Home
            </a>
            {/* redirect to login page if not logged in */}
            {sessionStorage.getItem('token') ? (
              <>
                <a href="/events" className={classes.link}>
                  Events
                </a>
                <a href="/clubs" className={classes.link}>
                  Clubs
                </a>
              </>
            ) : (
              <>
                <a href="/login" className={classes.link}>
                  Events
                </a>
                <a href="/login" className={classes.link}>
                  Clubs
                </a>
              </>
            )}


          </Center>
        </Group>

        <Group style={{ flex: 1, justifyContent: 'flex-end' }} visibleFrom='sm'>
          {/* if user is logged in, show sign out button, else show login and register buttons */
            // if jwt token is present, show sign out button
            sessionStorage.getItem('token') ? (
              <Button
                onClick={() => {
                  sessionStorage.removeItem('token');
                  nav('/');
                }}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button variant="default" component={Link} to="/login">Log in</Button>
                <Button component={Link} to="/register">Sign up</Button>
              </>
            )}
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </header>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation">
        <ScrollArea style={{ height: `calc(100vh - 80px)` }}>
          <a href="/" className={classes.link}>Home</a>
          <a href="/events" className={classes.link}>Events</a>
          <a href="/clubs" className={classes.link}>Clubs</a>

          <Group position="center" style={{ paddingTop: 'xl', width: '100%' }}>
            <Button variant="default" component={Link} to="/login">Log in</Button>
            <Button component={Link} to="/register">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
