// import routes (put this near top)
const express = require('express'); // import Express in our file
const path = require('path');
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const complainRouter = require('./routes/complain.js');
const apiRouter = require('./routes/api.js');

const port = 3000;

const app = express();

const filePath404Page = path.resolve(__dirname, '../client/404.html');

// put this AFTER we instantiate `app`, and BEFORE our GET and POST routes
app.use(express.static('client'));

// use routes (put this near the bottom, BEFORE app.listen()
app.use('/', indexRouter);

app.use('/bye', indexRouter);

app.use('/quotes', quotesRouter);

app.use('/complain', complainRouter);

app.use('/api', apiRouter);


// this is the LAST route, right before app.listen()
app.use((req, res) => {
  res.status(404).sendFile(filePath404Page);
});

// listen for connections on specified host and port
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
