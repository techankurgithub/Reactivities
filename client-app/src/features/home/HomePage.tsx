import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

    const HomePage = () => {
        const {userStore, modalStore} = useStore();

        return (
        <Segment inverted vertical textAlign="center" className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src="/assets/logo.png" alt="logo" style={{marginBottom: 12}}></Image>
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <Fragment>
                        <Header as='h2' inverted content="Welcome to Re-Activities"></Header>
                        <Button as={Link} to="/activities" size="huge" inverted>                    
                            Go to Activities
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button onClick={ () => {modalStore.openModal(<LoginForm/>)}} size="huge" inverted>
                        Login
                        </Button>
                        <Button onClick={ () => {modalStore.openModal(<RegisterForm />)}} size="huge" inverted>
                        Register
                        </Button>
                    </Fragment>
                )}
            </Container>
        </Segment>
    )};

    export default observer(HomePage);