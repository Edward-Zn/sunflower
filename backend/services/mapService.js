// backend/services/mapService.js
const logger = require("../utils/logger");
const Terrain = require("../models/Terrain");

/**
 * Generates a map with specified parametres
 * @param {number} w - width
 * @param {number} h - height
 * @returns {Array}
 */
const generateMap = async (w, h) => {
  try {
    // Fetch terrain data from the database
    const terrains = await Terrain.findAll();

    if (!terrains.length) {
      throw new Error("No terrain data available.");
    }

    const map = Array.from({ length: h }, () =>
      Array.from({ length: w }, () => {
        const t = terrains[Math.floor(Math.random() * terrains.length)];
        return {
          id: t.id,
          name: t.name,
          movement_cost: t.movement_cost,
          defense_bonus: t.defense_bonus,
          can_walk: t.can_walk,
          spawn_weight: t.spawn_weight,
          color: t.color,
        };
      })
    );

    logger.info("Map created:", map);

    return map;
  } catch (error) {
    logger.error("Error generating map:", error.message);
    throw error;
  }
};

module.exports = { generateMap };
