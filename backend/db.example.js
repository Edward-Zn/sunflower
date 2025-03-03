// backend/db.js
// Rename  connection parametres of Sequalize object. Rename file to db.js
const { Sequelize } = require("sequelize"); // Sequlize is Node.js and Typescript ORM

// Set up the Sequelize instance to connect to MySQL
const sequelize = new Sequelize(
  "--database--",
  "--username--",
  "--password--",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// Test the database connection.
// Async functions return promise. Async/await helps managing tasks that take time
async function testConnection() {
  try {
    await sequelize.authenticate(); // function will wait until Authentication promise is fulfilled
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
