// routes/terrainRoutes.js
const express = require('express');
const router = express.Router();
const { Terrain } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdminMiddleware');

// Endpoint GET /api/terrains - fetch all terrains
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const terrains = await Terrain.findAll();
    res.json(terrains);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch terrains' });
  }
});

// Endpoint PUT /api/terrains/:id - update terrain
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
      const terrain = await Terrain.findByPk(req.params.id);
      if (!terrain) {
        return res.status(404).json({ error: 'Terrain not found' });
      }
  
      await terrain.update(req.body);
      res.json(terrain);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update terrain' });
    }
  });
  
  module.exports = router;
