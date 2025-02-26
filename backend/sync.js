// backend/sync.js
const sequelize = require('./db');
const Player = require('./models/Player');
const Game = require('./models/Game');

async function syncDB() {
  try {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDB();