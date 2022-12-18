import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

    const HomePage = () => (
        <Segment inverted vertical textAlign="center" className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src="/assets/logo.png" alt="logo" style={{marginBottom: 12}}></Image>
                    Reactivities
                </Header>
                <Header as='h2' inverted content="Welcome to Activites"></Header>
                <Button as={Link} to="/activities" size="huge" inverted>
                    Take me to the Activities
                </Button>
            </Container>
        </Segment>
    );

    export default HomePage;