// backend/routes/player.js
const express = require('express');
const Player = require('../models/Player');
const crypto = require('crypto');
const moment = require('moment');
const router = express.Router();

// POST: Register a new player
router.post('/register', async (req, res) => {
  try {
    const { username, phone } = req.body;

    // Generate a unique link for the player
    const uniqueLink = crypto.randomBytes(16).toString('hex');
    const linkExpiresAt = moment().add(7, 'days').toDate(); // Link expires in 7 days

    // Save the player to the database
    const player = await Player.create({
      username,
      phone,
      uniqueLink,
      linkExpiresAt,
    });

    res.status(201).json({
      message: 'Player registered successfully!',
      player: {
        username: player.username,
        phone: player.phone,
        uniqueLink: player.uniqueLink,
        linkExpiresAt: player.linkExpiresAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering player' });
    console.log("BODY: ", req.body);
  }
});

module.exports = router;

// Endpoint POST http://localhost:5000/api/player/register