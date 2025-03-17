import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import PlayerForm from "./components/PlayerForm";
import GameBoard from "./components/GameBoard";
import TurnIndicator from "./components/TurnIndicator";
import ActionPanel from "./components/ActionPanel";

import log from "./utils/logger";

import "./styles/styles.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  // Notify player when registration is successful
  const handlePlayerSubmit = (playerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerData]); // ... - Spread for iterable players
    log.info("Player Data", playerData);
    const { player: { username } } = playerData;
    toast.success(`Player ${username} joined the game!`);
  };

  // Notify when game starts
  const startGameNotification = () => {
    if (players.length === 2) {
      toast.info("Let the game begin! ⚔️");
    }
  };

  // Trigger start game notification when 2 players join
  React.useEffect(() => {
    startGameNotification();
  }, [players]);

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

      {/* Toast Container to handle notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
