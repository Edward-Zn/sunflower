// src/components/UserList.js
import React from "react";

const UserList = ({ users = [], currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="user-list-container">
      <h3>Online Users:</h3>
      <ul>
        {users && users.length > 0 ? (
          users.some((p) => p.id === currentUser.id) ? (
            users.map((p) => <li key={p.id}>{p.username}</li>)
          ) : (
            <>
              {users.map((p) => (
                <li key={p.id}>{p.username}</li>
              ))}
              <li key={currentUser.id}>{currentUser.username} (You)</li>
            </>
          )
        ) : (
          <li>{currentUser.username} (You)</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
