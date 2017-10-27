var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , labTittle: 'Laboratorio 4',description: 'Desarrollo de APIS' });
});

module.exports = router;
