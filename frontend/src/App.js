import React, { useEffect, useState } from "react";
import axios from "axios";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Lobby from "./components/Lobby";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";
import log from "./utils/logger";

import AdminPanel from "./components/Admin/AdminPanel";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [player, setPlayer] = useState(null);

  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => setShowLogin(!showLogin);

  const [checkingAuth, setCheckingAuth] = useState(true);

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
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPlayer(null);
  };

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API_URL}/api/player/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsLoggedIn(true);
          setPlayer(response.data.player);
        })
        .catch((error) => {
          log.error("Failed to fetch player (App):", error);
          localStorage.removeItem("token");
        })
        .finally(() => setCheckingAuth(false));
    } else {
      setCheckingAuth(false);
    }
  }, []);

  // Show either registration, login, or lobby
  return checkingAuth ? (
    <div className="container">Loading...</div> // Maybe add some loading animation here
  ) : (
    <div className="container mx-auto p-4 text-center">
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
        <Lobby player={player} onLogout={handleLogout} />
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
