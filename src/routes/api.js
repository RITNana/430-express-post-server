const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36}', () => {

});

deleteHootById();

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

// send a request to get the data for our helloJSON request
router.get('/helloJSON', (req, res) => {
  res.status(200).json({ message: 'Hello There!' });
});

// send a request to get the data for our timeJSON request
router.get('/timeJSON', (req, res) => {
  res.status(200).json({ time: new Date().toString() });
});

router.post('/addHoot', (req, res) => {
  // console.log('req.body.content=', req.body.content);
  // verify that we got POST data
  const content = req.body && req.body.content
    ? req.body.content
    : 'No req.body or req.body.content found!';

  // create a 'hoot' object literal
  const hoot = {
    testId: generateNewId(),
    content,
    createdAt: new Date(),
  };

  // add hoot to array
  hoots.push(hoot);

  // send new hoot back to caller
  res.status(201).json(hoot);
});

module.exports = router;
