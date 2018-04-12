import getBattleState from '../../api/getBattleState';
import { socket } from '../../socket.io/socketManager';

export default function getBattleStateProcess() {
  //export default function getBattleStateProcess(socket) {
  return (dispatch, getState) => {
    const scope = {};
    return getBattleState()
      .then(battleState => {
        const userDecks = getState().userDecks; //you can actually getState from the store this way. wtf?

        let processDeck = false;
        let playerCards = [];

        let playerNum = Number(localStorage.getItem('playerNum'));
        let playerName = localStorage.getItem('userName');
        let deckId = Number(localStorage.getItem('deckSelected'));
        let battleId = Number(localStorage.getItem('currentBattleId'));

        /*Initialize deck when battleState is null since
        BattleState is always null on first render for Player_1.*/
        if (!battleState) {
          processDeck = true;
        } else {
          if (playerNum === 1) {
            if (!battleState.p1_initialized) {
              processDeck = true;
            }
          } else {
            if (!battleState.p2_initialized) {
              processDeck = true;
            }
          }
        }

        //initializing deck & parsing the data, then push it to playerCards
        if (processDeck) {
          const deck = userDecks.find(deck => deck.id === deckId);

          playerCards = deck.cards.map((pokeObj, i) => {
            console.log('pokeObj----------------', pokeObj);
            let updatedStats = {};
            pokeObj.stats.forEach(statObj => {
              switch (statObj.stat.name) {
                case 'hp':
                  updatedStats.hp = statObj.base_stat;
                  updatedStats.total_hp = statObj.base_stat;
                  break;
                case 'special-defense':
                  updatedStats.spec_def = statObj.base_stat;
                  break;
                case 'special-attack':
                  updatedStats.spec_atk = statObj.base_stat;
                  break;
                case 'defense':
                  updatedStats.def = statObj.base_stat;
                  break;
                case 'attack':
                  updatedStats.atk = statObj.base_stat;
                  break;
                case 'speed':
                  updatedStats.spd = statObj.base_stat;
                  break;
                default:
                  updatedStats = {};
              }
            });
            //future development. Add more stats to the list
            return {
              id: pokeObj.id,
              name: pokeObj.name,
              types: pokeObj.types.slice().map(obj => obj.type.name),
              moves: pokeObj.moves.slice().map(obj => obj.move.name),
              image: pokeObj.sprites.front_default,
              stats: updatedStats
            };
          });
        }

        //when battleState is undefine, set it to default
        if (!battleState) {
          battleState = {
            battle_id: battleId,
            p1_battleZone: [],
            p1_deckZone: [],
            p1_graveYard: [],
            p1_turn: false,
            p1_initialized: false,
            p1_userName: '',

            p2_battleZone: [],
            p2_deckZone: [],
            p2_graveYard: [],
            p2_turn: false,
            p2_initialized: false,
            p2_userName: ''
          };
        }

        //initialize P1 & P2 deck to the default battleState above
        if (processDeck) {
          if (playerNum === 1) {
            battleState.p1_deckZone = playerCards;
            battleState.p1_initialized = true;
            battleState.p1_userName = playerName;
            if (battleState.p2_initialized === true) {
              battleState.p1_turn = true;
            }
          } else {
            battleState.p2_deckZone = playerCards;
            battleState.p2_initialized = true;
            battleState.p2_userName = playerName;
            if (battleState.p1_initialized === true) {
              battleState.p1_turn = true; //Q's shouldn't this be p2_turn instead?
            }
          }
        }

        scope.battleState = battleState; //store battleState to reference later
        scope.processDeck = processDeck; //to reference processDeck is True
        //return processDeck ? setBattleState(battleState) : {};
        return {};
      })
      .then(() => {
        //Emiting to B/E that the state was updated
        const battleState = scope.battleState;

        if (scope.processDeck === true) {
          socket.emit('STATE_UPDATED', battleState);
        }
        dispatch({ type: 'GET_BATTLE_STATE', getBattleState: battleState });
      });
  };
}
