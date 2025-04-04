// backend/controllers/MapController.js
const mapService = require('../services/mapService');

exports.generateMap = async (req, res) => {
    try {
        const width = parseInt(req.query.w) || 20;
        const height = parseInt(req.query.h) || 20;

        const map = await mapService.generateMap(width, height);
        res.status(200).json({ message: "Map generated successfully", map });
    } catch (error) {
        res.status(500).json({ message: "Error generating map", error: error.message });
    }
};

// module.exports = { generateMap };