import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
  } from '@mantine/core';
import { PasswordStrength } from "../PasswordStrength.jsx";
import classes from './RegisterTitle.module.css';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.jsx';
  
  export function RegisterTitle() {
    return (
        <div>
            <Container size={500} my={40}>
                <Title ta="center" className={classes.title}>
                Hello there!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component="button">
                    Sign in
                </Anchor>
                </Text>
        
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Name" placeholder="Name" required ></TextInput>
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordStrength></PasswordStrength>
                <PasswordInput label="Confirm Password" placeholder="Confirm password" required mt="md" />
                <Text>Select your university:</Text>
                <DropdownMenu></DropdownMenu>
                <Button fullWidth mt="xl">
                    Create account
                </Button>
                </Paper>
            </Container>
        </div>
    );
  }