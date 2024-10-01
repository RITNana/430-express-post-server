const express = require('express');

// create router instance
const router = express.Router();

// attach route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

module.exports = router;
