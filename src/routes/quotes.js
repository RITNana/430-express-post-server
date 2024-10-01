const express = require('express');

// call our db script
const db = require('../db.js');

const router = express.Router();

// obtain all the quotes
const data = db.getAllQuotes();

// access a single quote using a request query
// import our quote function from our database JS code
// if no id is found, return an empty object
router.get('/', (req, res) => {
  const { id } = req.query;
  if (id) {
    const quote = db.getQuoteById(id);
    if (quote) {
      return res.json(quote);
    }
    return res.json({});
  }
  return res.json(data);
});

// access a random quote
// import our randomQuote function 
router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

// access our recent quote
// import our recentQuote function
router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

// access a single quote using a query param (URL)
// import our quote function from our database JS code
// if no id is found, return an empty object
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    const quote = db.getQuoteById(id);
    if (quote) {
      return res.json(quote);
    }
    return res.send({});
  }
  return res.json(data);
});

// export our router
module.exports = router;
