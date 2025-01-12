import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    <span>The Tourist</span>
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to The Tourist' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) :
                    <>
                        <Button onClick={() => modalStore?.openModal(<LoginForm />)} size='huge' inverted>
                            <span>Login!</span>
                        </Button>
                        <Button onClick={() => modalStore?.openModal(<RegisterForm/>)} size='huge' inverted>
                            <span>Register!</span>
                        </Button>
                    </>
                }
            </Container>
        </Segment>
    )
});