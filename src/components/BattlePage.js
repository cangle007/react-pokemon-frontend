import React from 'react';
import BattlePageComponent from './BattlePageComponent';

export default function IndexPage({
  createBattleObj,
  create_message,
  create_room,
  clear_rootReducer,
  delete_battleState,
  defaultPokemonArray,
  getBattleState,
  get_battleState,
  get_userDecks,
  history,
  location,
  match,
  messages,
  onPokemonObj,
  onPokemonMove,
  pokemonArray,
  setBattleState,
  set_battleState,
  signOut,
  userDecks,
  userSignIn,
  update_battleState,
  update_messages
}) {
  return (
    <BattlePageComponent
      createBattleObj={createBattleObj}
      create_message={create_message}
      create_room={create_room}
      clear_rootReducer={clear_rootReducer}
      delete_battleState={delete_battleState}
      defaultPokemonArray={defaultPokemonArray}
      getBattleState={getBattleState}
      get_battleState={get_battleState}
      get_userDecks={get_userDecks}
      history={history}
      location={location}
      match={match}
      messages={messages}
      onPokemonObj={onPokemonObj}
      onPokemonMove={onPokemonMove}
      pokemonArray={pokemonArray}
      setBattleState={setBattleState}
      set_battleState={set_battleState}
      signOut={signOut}
      userDecks={userDecks}
      userSignIn={userSignIn}
      update_battleState={update_battleState}
      update_messages={update_messages}
    />
  );
}
