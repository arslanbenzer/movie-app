import { Container, Title, Text, Button, Group } from "@mantine/core";
import "./not-found.page.css";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Container className="not-found-container">
      <div className="flex-col">
        <span className="text-not-found">404</span>
        <Title className="not-found-title">Nothing to see here</Title>
        <Text c="dimmed" size="lg" ta="center" className="description">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Group justify="center">
          <Link to="/">
            <Button size="md">Take me back to home page</Button>
          </Link>
        </Group>
      </div>
    </Container>
  );
}
