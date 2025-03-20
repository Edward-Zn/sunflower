// src/components/Lobby.js
import React from "react";

const Lobby = ({ player }) => {
  return (
    <div>
      <h2>Welcome to the Lobby, {player.username}!</h2>
      <p>Waiting for other players to join...</p>
    </div>
  );
};

export default Lobby;