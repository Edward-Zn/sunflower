// backend/routes/mapRoutes.js
const express = require('express');
const router = express.Router();
const mapController = require('../controllers/MapController');

// Endpoint GET /generate-map
router.get('/generate-map', mapController.generateMap);

module.exports = router;
