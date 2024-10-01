const express = require('express');

const router = express.Router();

// send a request to get the data for our helloJSON request
router.get('/helloJSON', (req, res) => {
  res.status(200).json({ message: 'Hello There!' });
});

// send a request to get the data for our timeJSON request
router.get('/timeJSON', (req, res) => {
  res.status(200).json({ time: new Date().toString() });
});
module.exports = router;
