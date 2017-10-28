var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('entre putos');
  console.log(req.body);
  const user = req.text;
  const token = jwt.sign({user}, 'lab4');
  res.json({
    sucess: true,
    token: token
  });
});

module.exports = router;