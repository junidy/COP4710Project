import { Title, Text, Container, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to{' '}
          <Text component="span" inherit className={classes.highlight}>
            ClubHub 👋
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
          Discover and engage with student organizations and events across your campus. Explore new interests, connect with peers, and enhance your college experience at ClubHub!
          </Text>
        </Container>
      </div>
    </div>
  );
}