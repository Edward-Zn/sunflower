// services/mapService.js
const { Terrain } = require('../models/Terrain');

/**
 * Generates a map with specified dimensions
 * @param {number} width
 * @param {number} height
 * @returns {Array}
 */
const generateMap = async (width, height) => {
    try {
        // Fetch terrain data from the database
        const terrains = await Terrain.findAll();
        
        if (!terrains.length) {
            throw new Error("No terrain data available.");
        }

        // Format terrain data
        const terrainOptions = terrains.map(t => ({
            id: t.id,
            name: t.name,
            movement_cost: t.movement_cost,
            defense_bonus: t.defense_bonus,
            can_walk: t.can_walk,
            spawn_weight: t.spawn_weight,
            color: t.color
        }));

        console.log("Terrains fetched:", terrainOptions);

        // Just a placeholder for now
        return terrainOptions;

    } catch (error) {
        console.error("Error generating map:", error.message);
        throw error;
    }
};

module.exports = { generateMap };
