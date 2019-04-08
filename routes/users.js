const express = require('express');
const router = express.Router();
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).type('application/json').send(fs.readFileSync('data/members.json'));
});

module.exports = router;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
