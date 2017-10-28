var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laboratorio 4' , labTittle: 'Laboratorio 4',description: 'Desarrollo de APIS' });
});

module.exports = router;
