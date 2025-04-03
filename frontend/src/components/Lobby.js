// src/components/Lobby.js
import React, { useEffect, useState } from "react";
import { showInfo, showError } from "../utils/toastNotifications";
import log from "../utils/logger";
import axios from "axios";

import fetchWithAuth from "../utils/api";

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

  // Render Map Grid
  const renderMap = () => {
    return (
      <div className="map-grid">
        {mapData.map((row, rowIndex) => (
          <div key={rowIndex} className="map-row">
            {row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="map-tile"
                style={{
                  backgroundColor: tile.color,
                }}
                title={`Terrain: ${tile.name}\nMovement Cost: ${tile.movement_cost}\nDefense Bonus: ${tile.defense_bonus}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
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

      <button className="button logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Lobby;
