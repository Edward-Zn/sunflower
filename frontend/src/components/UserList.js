// src/components/UserList.js
import React from "react";

const UserList = ({ players = [], currentPlayer }) => {
  if (!currentPlayer) return null;

  return (
    <div className="user-list">
      <h3>Online Players:</h3>
      <ul>
        {players && players.length > 0 ? (
          players.some((p) => p.id === currentPlayer.id) ? (
            players.map((p) => <li key={p.id}>{p.username}</li>)
          ) : (
            <>
              {players.map((p) => (
                <li key={p.id}>{p.username}</li>
              ))}
              <li key={currentPlayer.id}>{currentPlayer.username} (You)</li>
            </>
          )
        ) : (
          <li>{currentPlayer.username} (You)</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
