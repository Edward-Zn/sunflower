import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Lobby from "./components/Lobby";
import GameBoard from "./components/GameBoard";
import TurnIndicator from "./components/TurnIndicator";
import ActionPanel from "./components/ActionPanel";

import log from "./utils/logger";
import "./styles/styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  // Handle successful registration
  const handlePlayerSubmit = (playerData) => {
    setPlayer(playerData.player);
    setIsLoggedIn(true);
    log.info("Player Data", playerData);
    toast.success(`Player ${playerData.player.username} joined the game!`);
  };

  // Handle login success
  const handleLoginSuccess = (playerData) => {
    setPlayer(playerData);
    setIsLoggedIn(true);
    toast.success(`Welcome back, ${playerData.username}!`);
  };

  // Show either registration, login, or lobby
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Sunflower Field</h1>

      {!isLoggedIn ? (
        <>
          {showLogin ? (
            <>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              <p>
                Don't have an account?{" "}
                <button onClick={toggleForm} className="link-button">
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onRegister={handlePlayerSubmit} />
              <p>
                Already have an account?{" "}
                <button onClick={toggleForm} className="link-button">
                  Login here
                </button>
              </p>
            </>
          )}
        </>
      ) : (
        <Lobby player={player} />
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
