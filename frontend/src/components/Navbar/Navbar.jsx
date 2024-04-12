import {
  Group,
  Button,
  Text,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text size="md">ClubHub</Text>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Center>
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

          <Group visibleFrom="sm">
            <Button variant="default" component={Link} to="/login">Log in</Button>
            <Button component={Link} to="/register">Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="/events" className={classes.link}>
            Events
          </a>
          <a href="/clubs" className={classes.link}>
            Clubs
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component={Link} to="/login">Log in</Button>
            <Button component={Link} to="/register">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}