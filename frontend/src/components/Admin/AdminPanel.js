import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin.css"; // For admin panel custom styles later

const AdminPanel = () => {
  const [terrains, setTerrains] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTerrains();
  }, []);

  const fetchTerrains = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/terrains", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTerrains(res.data);
    } catch (err) {
      console.error("Failed to fetch terrains:", err);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...terrains];
    updated[index][field] = field === "can_walk" ? value === "true" : value;
    setTerrains(updated);
  };

  const handleSave = async (terrain) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/terrains/${terrain.id}`, terrain, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`✅ Updated "${res.data.name}" successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update terrain.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="admin-panel">
      <h2>🛠️ Terrain Editor</h2>
      {message && <div className="message">{message}</div>}

      <table className="terrain-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Move Cost</th>
            <th>Defense</th>
            <th>Walkable</th>
            <th>Weight</th>
            <th>Color</th>
            <th>Preview</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {terrains.map((terrain, index) => (
            <tr key={terrain.id}>
              <td>
                <input
                  value={terrain.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={terrain.movement_cost}
                  onChange={(e) =>
                    handleChange(index, "movement_cost", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={terrain.defense_bonus}
                  onChange={(e) =>
                    handleChange(index, "defense_bonus", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={terrain.can_walk.toString()}
                  onChange={(e) =>
                    handleChange(index, "can_walk", e.target.value)
                  }
                >
                  <option value="true">✅ Yes</option>
                  <option value="false">🚫 No</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={terrain.spawn_weight}
                  onChange={(e) =>
                    handleChange(index, "spawn_weight", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="color"
                  value={terrain.color}
                  onChange={(e) =>
                    handleChange(index, "color", e.target.value)
                  }
                />
              </td>
              <td>
                <div
                  className="color-preview"
                  style={{ backgroundColor: terrain.color }}
                ></div>
              </td>
              <td>
                <button onClick={() => handleSave(terrain)}>💾 Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
