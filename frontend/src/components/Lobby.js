// src/components/Lobby.js
import React, { useEffect, useState } from "react";
import { showInfo, showError } from "../utils/toastNotifications";
import log from "../utils/logger";

import fetchWithAuth from "../utils/api";

import axios from "axios";

const Lobby = ({ player, onLogout }) => {
  const [lobbyData, setLobbyData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/lobby`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        log.info("Lobby data:", response.data);
      } catch (error) {
        log.error("Failed to fetch lobby data:", error);
        showError("Failed to load lobby. Please try again.");
      }
    };
  
    fetchLobby();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Force reset to login page

    showInfo("Logged out successfully. See you soon!");
    onLogout();
  };

  return (
    <div className="lobby-container">
      {lobbyData ? (
        <div>
          <h3>Online Players:</h3>
          <ul>
            {lobbyData.players.map((p) => (
              <li key={p.id}>{p.username}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading lobby data...</p>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Lobby;