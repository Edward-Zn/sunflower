import React, { useState } from "react";
import "./styles/styles.css";

import RegisterForm from "./components/RegisterForm";
import PlayerForm from "./components/PlayerForm";
import GameBoard from "./components/GameBoard";
import TurnIndicator from "./components/TurnIndicator";
import ActionPanel from "./components/ActionPanel";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  const handleRegister = () => {
    setIsRegistered(true);
  };
  console.log(players.length);
  // const handlePlayerSubmit = (playerName) => {
  //   setPlayers([...players, { name: playerName, id: players.length }]); // ... - Spread for iterable players
  // };

  // const handleEndTurn = () => {
  //   setCurrentTurn((prev) => (prev + 1) % players.length);
  // };

  // If the user is NOT registered, <RegisterForm /> appears.
  // After registration, we show <PlayerForm /> (adding players).
  // Once there are 2 players, the game UI (board, turns, actions) is displayed.
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Sunflower Field</h1>

      {!isRegistered ? (
        <RegisterForm onRegister={handleRegister} />
      ) : players.length < 2 ? (
        <PlayerForm onSubmit={setPlayers} />
      ) : (
        <>
          <TurnIndicator currentPlayer={players[currentTurn]} />
          <GameBoard players={players} />
          <ActionPanel onEndTurn={() => setCurrentTurn((currentTurn + 1) % players.length)} />
        </>
      )}
    </div>
  );
}

export default App;
