import React from 'react';
import { Group, Button, Text, Box, Burger, Drawer, ScrollArea, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Text size="md" style={{ flex: 1 }}>ClubHub</Text>

        <Group visibleFrom='sm' h='100%' gap={0}>
          <Center> {/* Centered links */}
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/events" className={classes.link}>
              Events
            </a>
            <a href="/clubs" className={classes.link}>
              Clubs
            </a>
          </Center>
        </Group>

        <Group style={{ flex: 1, justifyContent: 'flex-end' }} visibleFrom='sm'>
          <Button variant="default" component={Link} to="/login">Log in</Button>
          <Button component={Link} to="/register">Sign up</Button>
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
