// backend/models/Player.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Player = sequelize.define("Player", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniqueLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Player;
