// backend/models/Terrain.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Terrain = sequelize.define("Terrain", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movement_cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defense_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  can_walk: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  spawn_weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Terrain;