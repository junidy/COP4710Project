import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Group, Button, Text } from '@mantine/core';
import classes from './Navbar.module.css';

// Dummy authentication status check
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return Boolean(localStorage.getItem('user'));
};

const Navbar = () => {
  const loggedIn = false;

  return (
    <div className={classes.navbar}>
      <Group position="center" style={{ padding: '10px 0', width: '100%', justifyContent: 'center' }}>
        <Text component={Link} to="/" size="xl" weight={700} style={{ textDecoration: 'none' }}>
          ClubHub
        </Text>
        <Group>
          {loggedIn ? (
            <>
              <Button component={Link} to="/profile" variant="outline">
                My Profile
              </Button>
              <Button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                variant="outline"
                color="red"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant="outline">
                Login
              </Button>
              <Button component={Link} to="/register" variant="outline">
                Register
              </Button>
            </>
          )}
        </Group>
      </Group>
    </div>
  );
};

export default Navbar;
