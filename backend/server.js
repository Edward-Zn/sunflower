// Express is web framework for node.js
const express = require("express");
// Cross-Origin Resource Sharing for node.js. Middleware. Allows resource sharing across servers
const cors = require("cors");
// Body-parser is express middleware
// that reads a form's input and stores it as a javascript object accessible through req.body
const bodyParser = require("body-parser");

const playerRoutes = require("./routes/player");
const gameRoutes = require("./routes/game");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Sunflower Field!");
});

app.use("/api/player", playerRoutes); // Player routes
app.use("/api/game", gameRoutes); // Game routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
