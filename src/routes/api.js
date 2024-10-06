const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

// DELETE
// returns hoot with a matching id, otherwise undefined
const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

// reusable code
const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

// only be called if 36 characters passed in
// search if hoot is deleted
// return hoot copy
router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id} not found'`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

router.get('/hoots/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id} not found'`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
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
    id: generateNewId(),
    content,
    createdAt: new Date(),
  };

  // add hoot to array
  hoots.push(hoot);

  // send new hoot back to caller
  res.status(201).json(hoot);
});

// look for existing hoot, if there is none, send back 404 status errpr code
// if we DO, update the content property by adding a .updatedAt property
router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content
      ? req.body.content
      : 'No req.body or req.body.content found!';
    hoot.content = content;
    hoot.updatedAt = new Date();
    res.json(hoot);
  }
});

module.exports = router;
