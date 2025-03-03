// backend/models/Game.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Game = sequelize.define("Game", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player1Id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Players", // Name of the Player model
      key: "id",
    },
  },
  player2Id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Players",
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // Or 'in-progress', 'finished'
  },
});

module.exports = Game;
