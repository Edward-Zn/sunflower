// backend/routes/player.js
const express = require("express");
const Player = require("../models/Player");
const bcrypt = require('bcrypt');
const moment = require("moment");
const router = express.Router();

// POST: Register a new player
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate a unique link for the player
    const uniqueLink = crypto.randomBytes(16).toString("hex");
    const linkExpiresAt = moment().add(7, "days").toDate(); // Link expires in 7 days

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the player to the database
    const player = await Player.create({
      username,
      email,
      password: hashedPassword,
      uniqueLink,
      linkExpiresAt,
    });

    res.status(201).json({
      message: "Player registered successfully!",
      player: {
        username: player.username,
        email: player.email,
        uniqueLink: player.uniqueLink,
        linkExpiresAt: player.linkExpiresAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering player" });
    console.log("BODY: ", req.body);
  }
});

module.exports = router;

// Endpoint POST http://localhost:5000/api/player/register
