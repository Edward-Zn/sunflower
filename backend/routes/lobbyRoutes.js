// backend/routes/lobbyRoutes.js
const express = require("express");
const router = express.Router();
const { authenticatePlayer } = require("../middleware/authMiddleware");

router.get("/", authenticatePlayer, (req, res) => {
  res.json({ message: "Welcome to the lobby! (lobby.js)", player: req.player });
});

module.exports = router;

// Endpoint GET http://localhost:5000/api/lobby