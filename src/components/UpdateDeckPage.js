import React from 'react';
import UpdateDeckComponent from './UpdateDeckComponent';

export default function IndexPage({
  pokemonArray,
  defaultPokemonArray,
  onPokemonObj,
  userDecks,
  get_userDecks,
  delete_decks,
  update_decks,
  get_default_pokemon,
  history,
  match,
  location,
  signOut
}) {
  return (
    <UpdateDeckComponent
      onPokemonObj={onPokemonObj}
      pokemonArray={pokemonArray}
      defaultPokemonArray={defaultPokemonArray}
      userDecks={userDecks}
      get_userDecks={get_userDecks}
      delete_decks={delete_decks}
      update_decks={update_decks}
      get_default_pokemon={get_default_pokemon}
      history={history}
      match={match}
      location={location}
      signOut={signOut}
    />
  );
}
