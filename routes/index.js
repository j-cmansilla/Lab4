var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laboratorio 4' , labTittle: 'Laboratorio 4',description: 'Desarrollo de APIS' });
});

router.post('/api/login', function(req,res,next){
  const user = {id:3};
  const token = jwt.sign({user}, 'secret_key');
  res.json({
    token: token
  });
}); 

module.exports = router;
