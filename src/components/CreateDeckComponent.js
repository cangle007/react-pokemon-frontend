import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import professorOak from '../images/professorOak.png';
import pokeball2 from '../images/pokeball2.png';
import bg4 from '../images/bg4.jpg';
import {
  Button,
  Menu,
  Form,
  Segment,
  Card,
  Header,
  Message,
  Grid,
  Container,
  List,
  Image,
  Popup
} from 'semantic-ui-react';

let colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
  'red',
  'orange',
  'yellow',
  'olive',
  'green'
];

export default class CreateDeckComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '', //animation
      requirements: 'hover', //animation
      isOpen: true, //animation
      oakMessages: 'Hi there!!', //animation
      animation: 'fly down',
      duration: 500,
      visible: true,

      selectedPokemon: [],
      selectedDeckName: '',
      deckCreated: false,
      redirect: false
    };
  }

  handle_deckCreated = () => {
    this.setState({ deckCreated: false });
  };

  handle_routeToHome = () => {
    let { history } = this.props;
    let { deckCreated } = this.state;

    if (deckCreated) {
      history.push(`/home`);
    }
  };

  handle_messageBoard = () => {
    let { deckCreated, selectedPokemon } = this.state;

    if (!deckCreated && selectedPokemon.length <= 0) {
      return <Message.Header>please select your pokemon</Message.Header>;
    }

    if (selectedPokemon.length >= 1) {
      return (
        <Message.Header>
          {selectedPokemon.slice().pop().name + ' was selected'}
        </Message.Header>
      );
    }

    if (deckCreated) {
      return <Message.Header>your deck was created!!</Message.Header>;
    }
  };

  //**setState select pokemon**//
  handle_selectedPokemon = (event, data) => {
    let { selectedPokemon } = this.state;
    let duplicate = false;

    selectedPokemon.forEach(pokeArray => {
      if (pokeArray.id === data.id) {
        duplicate = true;
      }
    });
    if (!duplicate && selectedPokemon.length < 6) {
      this.setState({ selectedPokemon: [...selectedPokemon, data] });
    }
    //this.handle_Visibility();
  };

  //**delete state Pokemon**//
  handle_deletePokemon = (event, data) => {
    let { selectedPokemon } = this.state;
    let filteredArray = selectedPokemon.filter(
      pokeArray => pokeArray.id !== data.id
    );
    this.setState({ selectedPokemon: filteredArray });
  };

  //**setState Deck Name**//
  handle_selectedDeckName = data => {
    this.setState({ selectedDeckName: data.target.value });
  };

  //**Create Deck**//
  handle_createDeck = event => {
    event.preventDefault();
    let { selectedDeckName, selectedPokemon } = this.state;
    let { create_decks } = this.props;

    const deckName = selectedDeckName.trim();
    const wins = 0; //default to 0
    const losses = 0; //default to 0
    const pokemonIds = selectedPokemon.map(pokemon => pokemon.id);
    const userId = localStorage.getItem('userId');

    if (selectedPokemon.length >= 0 || selectedDeckName === '') {
      this.handle_Popup();
    }
    if (selectedDeckName !== '' && selectedPokemon.length >= 1) {
      create_decks(deckName, wins, losses, pokemonIds, userId);

      this.setState({ redirect: true });
      this.setState({ selectedPokemon: [] });
      this.setState({ selectedDeckName: '' });
      this.setState({ deckCreated: true });
    }

    //this.props.history.push(`/home`); //this is causing the homeComp not to re-render
  };

  // handle_ready = () => {
  //   setTimeout(this.handle_createDeck, 1000);
  //   setTimeout(this.handle_createRoom, 2000);
  // };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handle_signOut = (event, { name }) => {
    event.preventDefault();
    this.setState({ activeItem: name });
    let { signOut, history } = this.props;

    localStorage.removeItem('currentBattleId');
    localStorage.removeItem('deckSelected');
    localStorage.removeItem('playerNum');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIdSocket');

    signOut();
    history.push(`/`);
  };

  // *********************** CSS ANIMATION CODES: *********************** //

  // handle_Open = () => {
  //   let { selectedPokemon, selectedDeckName } = this.state;
  //   if (selectedPokemon.length < 6 && selectedDeckName === '') {
  //     this.setState({ isOpen: true });
  //   } else {
  //     this.setState({ isOpen: false });
  //   }
  // };
  //
  // handle_Close = () => {
  //   let { selectedPokemon, selectedDeckName } = this.state;
  //   if (selectedPokemon.length === 6 && selectedDeckName !== '') {
  //     this.setState({ isOpen: false });
  //   }
  // };

  handle_Visibility = () => this.setState({ visible: !this.state.visible });

  handle_Popup = () => {
    let { selectedPokemon, selectedDeckName } = this.state;

    if (selectedPokemon.length <= 0) {
      this.setState({
        oakMessages: <Popup.Header>- Select at least one pokemon</Popup.Header>
      });
    } else if (selectedDeckName === '') {
      this.setState({
        oakMessages: <Popup.Header>- Give your deck a name</Popup.Header>
      });
    } else {
      this.setState({
        oakMessages: (
          <Popup.Header>
            - {selectedDeckName} deck was created!!
          </Popup.Header>
        )
      });
    }
  };

  render() {
    let {
      activeItem,
      selectedPokemon,
      selectedDeckName,
      deckCreated
    } = this.state;
    let { pokemonArray } = this.props;

    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 300, padding: '1em 0em' }}
              vertical>
              <Menu inverted size="mini">
                <Menu.Item
                  fitted="vertically"
                  name="home"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}>
                  <Image
                    size="mini"
                    src={pokeball2}
                    style={{ marginRight: '1.5em' }}
                  />
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item
                  fitted="vertically"
                  name="Create Deck"
                  active={activeItem === 'Create Deck'}
                  onClick={this.handleItemClick}>
                  <Link to="/createdeck">Create Deck</Link>
                </Menu.Item>
                <Menu.Item
                  fitted="vertically"
                  name="signout"
                  active={activeItem === 'signout'}
                  onClick={this.handle_signOut}>
                  Sign-out
                </Menu.Item>
              </Menu>
              <Image src={bg4} width="100%" height="300" />
            </Segment>
            <br />
            <Grid textAlign="center">
              <Header style={{ fontSize: '2em' }}>Choose your Team</Header>
            </Grid>
            <br />
            <Card.Group itemsPerRow={9}>
              {pokemonArray &&
                pokemonArray.map((character, i) => {
                  return (
                    <Card
                      key={i}
                      id={character.id}
                      color={colors[i]}
                      name={character.name}
                      image={character.sprites.front_default}
                      onClick={this.handle_selectedPokemon}
                    />
                  );
                })}
            </Card.Group>
            {/* <Divider section /> */}

            <Message info>
              {this.handle_messageBoard()}
            </Message>

            <Segment style={{ padding: '5em 0em' }} vertical>
              <Grid container stackable verticalAlign="middle" columns="equal">
                <Grid.Row>
                  <Grid.Column floated="right" width={3}>
                    <Popup
                      inverted
                      position="top center"
                      hideOnScroll
                      content={this.state.oakMessages}
                      style={{
                        borderRadius: '0',
                        opacity: '0.7',
                        padding: '2em'
                      }}
                      trigger={<Image src={professorOak} size="medium" />}
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Segment inverted>
                      {!deckCreated
                        ? <Form inverted>
                            <Form.Group widths="equal">
                              <Form.Input
                                label="Deck Name"
                                type="text"
                                value={selectedDeckName}
                                onChange={this.handle_selectedDeckName}
                                placeholder="Deck Name"
                                width={2}
                              />
                            </Form.Group>
                            <Form.Checkbox label="I agree to use pokemon for good, not evil" />
                            <Button positive onClick={this.handle_createDeck}>
                              CREATE
                            </Button>
                          </Form>
                        : <Form inverted>
                            <p>Do you want to create more deck?</p>
                            <Button.Group size="large">
                              <Button
                                positive
                                onClick={this.handle_deckCreated}>
                                YES
                              </Button>
                              <Button.Or />
                              <Button onClick={this.handle_routeToHome}>
                                NO
                              </Button>
                            </Button.Group>
                          </Form>}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column floated="right">
                    <Card.Group itemsPerRow={2}>
                      {selectedPokemon.map((character, i) => {
                        return (
                          <Card
                            key={i}
                            color={colors[i]}
                            image={character.image}
                            id={character.id}
                            onClick={this.handle_deletePokemon}
                          />
                        );
                      })}
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <br />

            <Segment inverted vertical style={{ padding: '2em 0em' }}>
              <Container textAlign="center">
                <Image centered size="mini" src={pokeball2} />
                <List horizontal inverted divided link>
                  <List.Item>gotta catch em all</List.Item>
                </List>
              </Container>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
