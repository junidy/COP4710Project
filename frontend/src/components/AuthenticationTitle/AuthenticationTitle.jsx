import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postLogin } from '../../utils/endpoints';
import { getPlaceDetails } from '../../utils/placeDetails';

export function AuthenticationTitle() {
    const nav = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [rememberUser, setRememberUser] = useState(false);
    const [creds, setCreds] = useState({
        email: sessionStorage.getItem('email') || "",
        password: "",
    });
    const handleChange = event => {
        const target = event.target.getAttribute('name');
        setCreds({
            ...creds,
            [target]: event.target.value,
        })
    }
    const handleLogin = () => {
        console.log(creds);
        postLogin(creds)
            .then(token => {
                console.log(token);
                sessionStorage.setItem('token', token);

                if (rememberUser) {
                    sessionStorage.setItem('email', creds.email);
                } else {
                    sessionStorage.removeItem('email');
                }

                nav('/');
            })
            .catch(error => {
                console.error(error.toString());
                setErrorMsg("Could not sign in. Please check email and password.");
            });
    }
    return (
        <div className={classes.login}>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button" onClick={() => nav('/register')}>
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput value={creds.email} onChange={handleChange} label="Email" placeholder="hello@example.com" name="email" required />
                    <PasswordInput value={creds.password} onChange={handleChange} label="Password" placeholder="Your password" name="password" required mt="md" />
                    {/* <PasswordInput label="Password" placeholder="Your password" required mt="md" /> */}
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" checked={rememberUser} onChange={e => setRememberUser(e.target.checked)} />
                        {/* <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor> */}
                    </Group>
                    <Text c="red">{errorMsg}</Text>
                    <Button onClick={handleLogin} fullWidth mt="xl">
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}