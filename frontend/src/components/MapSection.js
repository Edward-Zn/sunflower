// src/components/MapSection.js
import React from "react";

const MapSection = ({ mapData, onRegenerate }) => {
  return (
    <div className="map-container">
      <button className="button command-button" onClick={onRegenerate}>
        Regenerate Map
      </button>

      {mapData.length > 0 && (
        <div className="map-grid">
          {mapData.map((row, rowIndex) => (
            <div key={rowIndex} className="map-row">
              {row.map((tile, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="map-tile"
                  style={{ backgroundColor: tile.color }}
                  title={`Terrain: ${tile.name}\nMove: ${tile.movement_cost}\nDefense: ${tile.defense_bonus}`}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapSection;
