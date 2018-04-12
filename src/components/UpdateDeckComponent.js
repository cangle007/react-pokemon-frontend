import React, { Component } from 'react';
import jenny from '../images/jenny.jpg';
import pokeball2 from '../images/pokeball2.png';
import { Link } from 'react-router-dom';
import bg10 from '../images/bg10.png';
import {
  Segment,
  Card,
  Header,
  Grid,
  List,
  Image,
  Button,
  Menu,
  Container,
  Progress,
  Label
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

    let currentPokemon = [];
    this.props.userDecks.forEach(deck => {
      if (deck.id === Number(this.props.match.params.deckId)) {
        currentPokemon = deck.cards.map(pokemon => {
          return {
            color: 'red',
            name: pokemon.name,
            id: pokemon.id,
            image: pokemon.sprites.front_default
          };
        });
      }
    });

    this.state = {
      activeItem: '',
      selectedPokemon: currentPokemon,
      selectedDeckName: '',
      redirect: false
    };
  }

  //**setState select pokemon**//
  handle_selectedPokemon = (event, data) => {
    event.preventDefault();
    let duplicate = false;
    this.state.selectedPokemon.forEach(pokemon => {
      if (pokemon.id === data.id) {
        duplicate = true;
      }
    });

    if (!duplicate && this.state.selectedPokemon.length < 6) {
      this.setState(currentState => {
        return {
          selectedPokemon: [...currentState.selectedPokemon, data]
        };
      });
    }
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

  //**setState User Name**//
  handle_selectedUserName = data => {
    this.setState({ selectedUserName: data.target.value });
  };

  //**Update Deck**//
  handle_updateDeck = event => {
    let { selectedPokemon } = this.state;
    let { match, update_decks } = this.props;
    const characterIdArray = selectedPokemon.map(pokemon => {
      return pokemon.id;
    });
    const deckId = match.params.deckId;
    const userId = localStorage.getItem('userId');
    update_decks(
      {
        characterIdArray,
        userId
      },
      deckId
    );
    this.setState({ redirect: true });
  };

  handle_battlePage = (event, data) => {
    this.props.history.push(`/decks/${data.value[0].id}/battle`);
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //**Sign out**//
  handle_signOut = (event, { name }) => {
    event.preventDefault();
    this.setState({ activeItem: name });

    localStorage.removeItem('currentBattleId');
    localStorage.removeItem('deckSelected');
    localStorage.removeItem('playerNum');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIdSocket');

    this.props.signOut();
    this.props.history.push(`/`);
  };

  render() {
    let { userDecks, match, pokemonArray } = this.props;
    let { activeItem, selectedPokemon } = this.state;

    let userObj = userDecks.filter(
      result => result.id === parseInt(match.params.deckId, 10)
    );
    let numWin = userDecks.forEach((deck, i) => {
      return parseInt(
        Math.round(deck.wins / (deck.wins + deck.losses) * 100),
        10
      );
    });
    let numLose = userDecks.forEach((deck, i) => {
      return parseInt(
        Math.round(deck.losses / (deck.wins + deck.losses) * 100),
        10
      );
    });
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
              <Image src={bg10} width="100%" height="300" />
            </Segment>
            <br />
            <Grid textAlign="center">
              <Header style={{ fontSize: '2em' }}>Update Your Deck</Header>
              <br />
              <Card.Group itemsPerRow={9}>
                {pokemonArray &&
                  pokemonArray.map((pokemonObj, i) => {
                    return (
                      <Card
                        key={i}
                        id={pokemonObj.id}
                        color={colors[i]}
                        name={pokemonObj.name}
                        image={pokemonObj.sprites.front_default}
                        onClick={this.handle_selectedPokemon}
                      />
                    );
                  })}
              </Card.Group>
            </Grid>

            <Grid centered columns={3}>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Card.Group>
                    {userObj &&
                      userObj[0] &&
                      <Card id={userObj[0].id} name="deckId">
                        <Card.Content>
                          <Image floated="right" size="mini" src={jenny} />
                          <Card.Header
                            name="deckName"
                            value={userObj[0].deckname}>
                            {userObj[0].deckname}
                          </Card.Header>
                          <List size="massive" horizontal>
                            {userObj[0].cards.map((character, i) => {
                              return (
                                <Label key={i} size="small" image>
                                  <Image
                                    src={character.sprites.front_default}
                                  />
                                  {character.name}
                                </Label>
                              );
                            })}
                          </List>
                        </Card.Content>
                        <Card.Content extra>
                          <Link to="/home">
                            <Button
                              basic
                              color="red"
                              onClick={this.handle_updateDeck}>
                              UPDATE
                            </Button>
                          </Link>
                        </Card.Content>
                        <Segment inverted>
                          <Progress
                            percent={numWin ? numWin : 0}
                            inverted
                            progress
                            success>
                            WINS
                          </Progress>
                          <Progress
                            percent={numLose ? numLose : 0}
                            inverted
                            progress
                            warning>
                            LOSSES
                          </Progress>
                        </Segment>
                      </Card>}
                  </Card.Group>
                </Grid.Column>

                <Grid.Column>
                  <Segment style={{ padding: '5em 0em' }} vertical>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column floated="left" width={8}>
                          <Card.Group itemsPerRow={2}>
                            {selectedPokemon.map((pokemonObj, i) =>
                              <Card
                                key={i}
                                color={colors[i]}
                                image={pokemonObj.image}
                                id={pokemonObj.id}
                                onClick={this.handle_deletePokemon}
                              />
                            )}
                          </Card.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>

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
