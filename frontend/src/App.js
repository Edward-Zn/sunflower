import React, { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import GameBoard from "./components/GameBoard";
import TurnIndicator from "./components/TurnIndicator";
import ActionPanel from "./components/ActionPanel";

function App() {
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  const handlePlayerSubmit = (playerName) => {
    setPlayers([...players, { name: playerName, id: players.length }]);
  };

  const handleEndTurn = () => {
    setCurrentTurn((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Sunflower RPG Battle</h1>
      {players.length < 2 ? (
        <PlayerForm onSubmit={handlePlayerSubmit} />
      ) : (
        <>
          <TurnIndicator currentPlayer={players[currentTurn]} />
          <GameBoard players={players} />
          <ActionPanel onEndTurn={handleEndTurn} />
        </>
      )}
    </div>
  );
}

export default App;
