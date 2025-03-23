// src/components/Lobby.js
import React from "react";
import { toast } from "react-toastify";

const Lobby = ({ player, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Force reset to login page
    toast.info("Logged out successfully. See you soon!");
    onLogout();
  };

  return (
    <div className="lobby-container">
      <h2>Welcome, {player.username}!</h2>
      <p>Waiting for other players...</p>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Lobby;