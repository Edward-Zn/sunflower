// src/components/Lobby.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { showInfo, showError } from "../utils/toastNotifications";
import log from "../utils/logger";

import UserList from "./UserList";
import MapSection from "./MapSection";

const Lobby = ({ player, onLogout }) => {
  const [lobbyData, setLobbyData] = useState(null);
  const [mapData, setMapData] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchLobby();
    fetchMap(); // Fetch map on component mount
  }, []);

  // Fetch Lobby Data
  const fetchLobby = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/lobby`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      log.info("Lobby data:", response.data);
      setLobbyData(response.data);
    } catch (error) {
      log.error("Failed to fetch lobby data:", error);
      showError("Failed to load lobby. Please try again.");
    }
  };

  // Fetch Map Data
  const fetchMap = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/generate-map`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      log.info("Map data:", response.data.map);
      setMapData(response.data.map);
    } catch (error) {
      log.error("Failed to fetch map data:", error);
      showError("Failed to generate map. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Force reset to login page

    showInfo("Logged out successfully. See you soon!");
    onLogout();
  };

  return (
    <div className="lobby-container">
      {/* Header Bar */}
      <div className="lobby-header">
        <h1 className="lobby-title">Sunflower Field</h1>
        <div className="header-buttons">
          <button className="button logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="lobby-main">
        {/* Map Container */}
        <MapSection mapData={mapData} onRegenerate={fetchMap} />

        {/* Player List */}
        <UserList users={lobbyData?.players} currentUser={player} />
      </div>
    </div>
  );
};

export default Lobby;
