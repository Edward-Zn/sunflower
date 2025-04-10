// backend/controllers/lobbyController.js
const { Player } = require("../models/Player");

exports.getLobbyData = async (req, res) => {
  try {
    // Fetch online players
    const onlinePlayers = await Player.findAll({
      where: { online: true }
    });

    // Fetch recently online players (within last 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentPlayers = await Player.findAll({
      where: {
        last_active: { [Op.gte]: tenMinutesAgo }
      }
    });

    res.status(200).json({
      players: onlinePlayers,
      recentPlayers: recentPlayers
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lobby data", error });
  }
};
