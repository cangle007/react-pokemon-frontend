import React from 'react';
import CreateDeckComponent from './CreateDeckComponent';

export default function IndexPage({
  pokemonArray,
  defaultPokemonArray,
  onPokemonObj,
  create_decks,
  userDecks,
  users,
  userSignIn,
  signOut,
  history
}) {
  return (
    <CreateDeckComponent
      onPokemonObj={onPokemonObj}
      pokemonArray={pokemonArray}
      defaultPokemonArray={defaultPokemonArray}
      create_decks={create_decks}
      userDecks={userDecks}
      users={users}
      userSignIn={userSignIn}
      signOut={signOut}
      history={history}
    />
  );
}
