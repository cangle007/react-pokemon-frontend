import React, { Component } from 'react';
import pokeball2 from '../images/pokeball2.png';
import cinema2 from '../images/cinema2.webm';
import ReactPlayer from 'react-player';
import {
  Segment,
  Header,
  Image,
  Form,
  List,
  Container,
  Button,
  Grid,
  Divider
} from 'semantic-ui-react';

export default class IndexComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',

      signIn_name: '',
      signIn_password: '',
      signUp_name: '',
      signUp_password: '',
      signupStatus: false,
      signUp_errorName: '',
      signUP_errorPassword: ''
    };
  }

  //*************************//
  //**** sign-up section ****//
  //*************************//
  handle_signUp_selectedName = event => {
    this.setState({ signUp_name: event.target.value });
  };

  handle_signUp_selectedPassword = event => {
    this.setState({ signUp_password: event.target.value });
  };

  signUp_validate = (signUp_name, signUp_password) => {
    let isThereError = false;
    const errors = {
      signUp_errorName: '',
      signUP_errorPassword: ''
    };

    let duplicateName = '';
    this.props.users.usersObj.forEach(listOfUsers => {
      if (listOfUsers.name === signUp_name) {
        return (duplicateName = true);
      }
    });

    if (signUp_name === '') {
      isThereError = true;
      errors.signUp_errorName = 'This is required';
    } else if (signUp_name.length < 4) {
      isThereError = true;
      errors.signUp_errorName = 'Username need at least 4 characters';
    } else if (duplicateName === true) {
      isThereError = true;
      errors.signUp_errorName = 'Username is already taken';
    } else if (duplicateName === false) {
      isThereError = false;
    }

    if (signUp_password === '') {
      isThereError = true;
      errors.signUP_errorPassword = 'This is required';
    } else if (signUp_password.length < 4) {
      isThereError = true;
      errors.signUP_errorPassword = 'Password need at least 4 characters';
    }
    return isThereError ? errors : true;
  };

  handle_signup = (event, data) => {
    event.preventDefault();
    let { signUp_name, signUp_password } = this.state;
    let { signUp, history } = this.props;

    let name = signUp_name.trim();
    let password = signUp_password.trim();
    let errorPass = this.signUp_validate(name, password);

    if (errorPass !== true) {
      this.setState(errorPass);
    } else {
      signUp({ name: name, password: password });
      this.setState({
        signupStatus: true,
        signUp_name: '',
        signUp_password: '',
        signUp_errorName: '',
        signUP_errorPassword: ''
      });
      history.push(`/`);
    }
  };

  //*************************//
  //**** sign-in section ****//
  //*************************//
  handle_signIn_selectedName = data => {
    this.setState({ signIn_name: data.target.value });
  };

  handle_signIn_selectedPassword = data => {
    this.setState({ signIn_password: data.target.value });
  };

  signIn_validate = (name, password) => {
    let isThereError;
    let errorsObj = {
      signIn_errorName: '',
      signIn_errorPassword: ''
    };

    if (name === '') {
      isThereError = true;
      errorsObj.signIn_errorName = 'Please enter your name';
    }
    if (password === '') {
      isThereError = true;
      errorsObj.signIn_errorPassword = 'Password entered is blank';
    }
    return isThereError ? errorsObj : false;
  };

  handle_signin = (event, data) => {
    event.preventDefault();
    const name = this.state.signIn_name.trim();
    const password = this.state.signIn_password.trim();

    let failedValidation = this.signIn_validate(name, password); //return an obj when true

    if (failedValidation) {
    } else {
      this.props.signIn({ name, password });
    }
  };

  render() {
    if (this.props.userSignIn && this.props.userSignIn.name) {
      this.props.history.push('/home');
    }
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Container fluid>
              <ReactPlayer
                // style={{ display: '100%' }}
                width="100%"
                height="100%"
                url={cinema2}
                playing
              />
            </Container>

            <Grid centered columns="equal" padded>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  <Image src={pokeball2} /> Welcome
                </Header>
                <Segment stacked>
                  <Form size="large">
                    <Form.Input
                      fluid
                      icon="user"
                      id="userId"
                      iconPosition="left"
                      placeholder="username"
                      onChange={this.handle_signIn_selectedName}
                    />
                    {this.state.signIn_errorName !== ''
                      ? <p style={{ color: 'Red' }}>
                          {this.state.signIn_errorName}
                        </p>
                      : null}
                    <Form.Input
                      fluid
                      icon="lock"
                      id="passwordId"
                      iconPosition="left"
                      placeholder="password"
                      type="password"
                      onChange={this.handle_signIn_selectedPassword}
                    />

                    {this.state.signIn_errorPassword !== ''
                      ? <p style={{ color: 'Red' }}>
                          {this.state.signIn_errorPassword}
                        </p>
                      : null}
                    {this.state.signIn_errorPassword !== '' &&
                      this.props.errorMessage &&
                      <p style={{ color: 'Red' }}>
                        {this.props.errorMessage}
                      </p>}
                    <Button
                      color="red"
                      fluid
                      size="large"
                      onClick={this.handle_signin}>
                      Sign-In
                    </Button>
                  </Form>

                  <Divider horizontal>OR</Divider>
                  {this.state.signupStatus
                    ? <p style={{ color: 'Green' }}>
                        {'Successfully Registered'}
                      </p>
                    : null}
                  <Form size="large">
                    <Form.Input
                      fluid
                      icon="user"
                      value={this.state.signUp_name}
                      //id="userId"
                      iconPosition="left"
                      placeholder="username"
                      onChange={this.handle_signUp_selectedName}
                    />
                    {this.state.signUp_errorName !== ''
                      ? <p style={{ color: 'Red' }}>
                          {this.state.signUp_errorName}
                        </p>
                      : null}

                    <Form.Input
                      fluid
                      icon="lock"
                      value={this.state.signUp_password}
                      //id="passwordId"
                      iconPosition="left"
                      placeholder="password"
                      type="password"
                      onChange={this.handle_signUp_selectedPassword}
                    />
                    {this.state.signUP_errorPassword !== ''
                      ? <p style={{ color: 'Red' }}>
                          {this.state.signUP_errorPassword}
                        </p>
                      : null}
                    <Button
                      color="black"
                      fluid
                      size="large"
                      onClick={this.handle_signup}>
                      Sign-up
                    </Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>

            <Segment inverted vertical style={{ padding: '2em 0em' }}>
              <Container textAlign="center">
                <Image centered size="mini" src={pokeball2} />
                <List horizontal inverted divided link>
                  <List.Item as="a" href="#">
                    gotta catch em all
                  </List.Item>
                </List>
              </Container>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
