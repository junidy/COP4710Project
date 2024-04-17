import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Select,
    SegmentedControl,
} from '@mantine/core';
import { PasswordStrength } from "../PasswordStrength.jsx";
import classes from './RegisterTitle.module.css';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.jsx';
import { getUniversities, postRegister } from '../../utils/endpoints.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterTitle() {
    const nav = useNavigate();
    const [creds, setCreds] = useState({
        password: "",
        name: "",
        phone: "",
        email: "",
        university_id: null,
        isAdmin: false
    });
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        getUniversities()
            .then(universities => {
                const formattedUniversities = universities.map(university => ({
                    label: university.name,
                    value: university.id.toString(),
                }));
                setUniversities(formattedUniversities);
            })
            .catch(error => console.error(error));
    }, []);

    const handleChange = event => {
        const target = event.target.getAttribute('name');
        setCreds({
            ...creds,
            [target]: event.target.value,
        })
    }
    const handleRegister = e => {
        postRegister(creds)
            .then(token => {
                console.log(token);
                sessionStorage.setItem('token', token);
                nav('../events');
            })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <Container size={500} my={40}>
                <Title ta="center" className={classes.title}>
                    Hello there!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Already have an account?{' '}
                    <Anchor size="sm" component="button" onClick={() => nav('/login')}>
                        Sign in
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput value={creds.name} onChange={handleChange} label="Name" placeholder="Name" name="name" required ></TextInput>
                    <TextInput value={creds.email} onChange={handleChange} label="Email" placeholder="you@mantine.dev" name="email" required />
                    <TextInput value={creds.phone} onChange={handleChange} label="Phone" placeholder="555-555-5555" name="phone" required />
                    <PasswordStrength></PasswordStrength>
                    <PasswordInput value={creds.password} onChange={handleChange} label="Confirm Password" placeholder="Confirm password" name="password" required mt="md" />
                    {/* <Text>Select your university:</Text> */}
                    {/* <DropdownMenu onChange={handleChange}></DropdownMenu> */}
                    <Select value={creds.university} onChange={(v, o) => setCreds({ ...creds, university_id: v })} label="University" placeholder="Select your university" data={universities} required />
                    <Select onChange={(v, o) => setCreds({ ...creds, isAdmin: v === "RSO Administrator" })} label="Account type" defaultValue="Student" data={['Student', 'RSO Administrator']} required />
                    <Button onClick={handleRegister} fullWidth mt="xl">
                        Create account
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}