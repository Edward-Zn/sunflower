// backend/routes/player.js
const express = require("express");
const Player = require("../models/Player");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const moment = require("moment");
const router = express.Router();

// POST: Register a new player
router.post("/register", async (req, res) => {
  console.log("Player data before save:", req.body);
  try {
    const { username, email, password } = req.body;
    console.log("REQ BODY: " + JSON.stringify(req.body));
    // Generate a unique link for the player
    const uniqueLink = crypto.randomBytes(16).toString("hex");
    const linkExpiresAt = moment().add(7, "days").toDate(); // Link expires in 7 days

    if (!username || !email || !password) {
      console.log("Validation failed. Missing fields:", { username, email, password });
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the player to the database
    console.log("Attempting to create player with:", { username, email, hashedPassword });
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
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    console.error("Server error (player.js):", err.message); // Log the real error message in the server console
    res.status(500).json({ 
        message: "Error registering player. Server error (player.js)", 
        error: err.message || "Unknown error" 
    });
    console.log("BODY: ", req.body);
  }
});

module.exports = router;

// Endpoint POST http://localhost:5000/api/player/register
