// backend/routes/game.js
const express = require("express");
const Game = require("../models/Game");
const Player = require("../models/Player");
const router = express.Router();

// POST: Create a new game
router.post("/create", async (req, res) => {
    try {
        const { name, player1Id, player2Id } = req.body;

        // Ensure both players exist
        const player1 = await Player.findByPk(player1Id);
        const player2 = await Player.findByPk(player2Id);

        if (!player1 || !player2) {
            return res.status(404).json({ message: "Players not found" });
        }

        // Create a new game
        const game = await Game.create({
            name: name,
            player1Id: player1.id,
            player2Id: player2.id,
            status: "pending",
        });

        res.status(201).json({
            message: "Game created successfully!",
            game: {
                id: game.id,
                name: game.name,
                player1: player1.username,
                player2: player2.username,
                status: game.status,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating game" });
    }
});

// Endpoint POST http://localhost:5000/api/game/create

router.put("/update/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const gameId = req.params.id;

        const game = await Game.findByPk(gameId);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        game.status = status;
        await game.save();

        res.status(200).json({
            message: "Game status updated",
            game: {
                id: game.id,
                status: game.status,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating game" });
    }
});

// Endpoint PUT http://localhost:5000/api/game/update/1

module.exports = router;

