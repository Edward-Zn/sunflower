// backend/routes/gameRoutes.js
const express = require('express');
const { switchTurn } = require('../gameLogic');

const router = express.Router();

router.post('/switch-turn', (req, res) => {
  switchTurn();
  res.json({ message: 'Turn switched successfully' });
});

module.exports = router;
