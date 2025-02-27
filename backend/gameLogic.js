// backend/gameLogic.js
const gameState = require('./gameState');

function switchTurn() {
  gameState.currentTurn = (gameState.currentTurn + 1) % gameState.players.length;
  console.log(`It's now ${gameState.players[gameState.currentTurn]}'s turn`);
}

module.exports = { switchTurn };
