import React, { useState } from "react";

import RegisterForm from "./components/RegisterForm";
import PlayerForm from "./components/PlayerForm";
import GameBoard from "./components/GameBoard";
import TurnIndicator from "./components/TurnIndicator";
import ActionPanel from "./components/ActionPanel";

import "./styles/styles.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  const handlePlayerSubmit = (playerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerData]); // ... - Spread for iterable players
  };

  // If the user is NOT registered, <RegisterForm /> appears.
  // After registration, we show <PlayerForm /> (adding players).
  // Once there are 2 players, the game UI (board, turns, actions) is displayed.
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Sunflower Field</h1>

      {players.length < 2 ? (
        <RegisterForm onRegister={handlePlayerSubmit} />
      ) : (
        <>
          <TurnIndicator currentPlayer={players[0]} />
          <GameBoard players={players} />
          <ActionPanel />
        </>
      )}
    </div>
  );
}

export default App;
