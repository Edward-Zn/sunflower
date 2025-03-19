// backend/routes/player.js
const express = require("express");
const Player = require("../models/Player");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const moment = require("moment");
const router = express.Router();
const { generateToken } = require('../utils/jwt');
const logger = require('../utils/logger');

// POST: Register a new player
router.post("/register", async (req, res) => {
  logger.info("Player data before save:", req.body);
  try {
    const { username, email, password } = req.body;
    logger.info("REQ BODY: ", JSON.stringify(req.body));

    // Generate a unique link for the player
    const uniqueLink = crypto.randomBytes(16).toString("hex");
    const linkExpiresAt = moment().add(7, "days").toDate(); // Link expires in 7 days

    if (!username || !email || !password) {
      logger.error("Validation failed. Missing fields:", { username, email, password });
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPlayer = await Player.findOne({ where: { email } });
    if (existingPlayer) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the player to the database
    logger.info('Attempting to create a new player', { username, email, hashedPassword });
    const newPlayer = await Player.create({
      username,
      email,
      password: hashedPassword,
      uniqueLink,
      linkExpiresAt,
    });

    const token = generateToken(newPlayer);

    res.status(201).json({
      message: "Player registered successfully!",
      player: {
        username: newPlayer.username,
        email: newPlayer.email,
        uniqueLink: newPlayer.uniqueLink,
        linkExpiresAt: newPlayer.linkExpiresAt,
      },
      token,
    });

  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    logger.error("Server error (player.js):", err.message); // Log the real error message in the server console
    res.status(500).json({ 
        message: "Error registering player. Server error (player.js)", 
        error: err.message || "Unknown error" 
    });
    logger.info("REQUEST BODY: ", req.body);
  }
});

module.exports = router;

// Endpoint POST http://localhost:5000/api/player/register

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const player = await Player.findOne({ where: { email } });
    if (!player) {
      return res.status(404).json({ message: "Player not found!" });
    }

    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const token = generateToken(player);

    res.status(200).json({
      message: "Login successful!",
      player: {
        username: player.username,
        email: player.email,
        uniqueLink: player.uniqueLink,
      },
      token,
    });

  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Endpoint POST http://localhost:5000/api/player/login