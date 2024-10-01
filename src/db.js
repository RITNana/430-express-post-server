const fs = require('fs');
const path = require('path');

// obtain the directory path our server will need 
// parse and destructure our data 
const quotesPath = path.resolve(__dirname, 'data/quotes-data.json');
const jsonString = fs.readFileSync(quotesPath);
const data = JSON.parse(jsonString);
const { quotes } = data; // object destructuring

// PUBLIC METHODS
const getAllQuotes = () => quotes;

// get a random quote
// return quote
const randomQuote = () => {
  const quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
  return quote;
};

// get a recent quote
// return quote
const recentQuote = () => {
  const quote = data.quotes[data.quotes.length - 1];
  return quote;
};

// get a quote by ID
// return quote
const getQuoteById = (id) => {
  const foundQuote = data.quotes.find((quote) => quote.id === id);
  return foundQuote;
};

// export our funtions
module.exports = {
  getAllQuotes, randomQuote, recentQuote, getQuoteById,
};
