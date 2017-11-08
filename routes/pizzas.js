var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds243285.mlab.com:43285/pizzalab4');
var Pizza = require('../models/pizza');
var pizzas = [];
var pizzasList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    Pizza.find({}, function(err, pizzaToList) {
        if (err) throw err;
        // object of all the pizzas
        pizzasList = pizzaToList;
        res.send(pizzaToList);
    });
    res.status(200);
});

router.post('/BuscarPorNombre', function(req, res, next){
    var nombrePizza = req.body.nombre;
    let pizza = pizzas.find(x=>x.nombre === nombrePizza);
    if(pizza){
        res.status(200).json(pizza);
        res.sucess = true;
        res.send(pizza);
    }
    else{
        let err = new Error("Not found!");
        err.status = 404;
        next(err);
    }
});

router.get('/:nombre', function(req, res, next){
var nombrePizza = req.body.nombre;
let pizza = pizzas.find(x=>x.nombre === nombrePizza);

if(pizza){
    res.send(pizza);
    res.status(200).json(pizza);
}
else{
    let err = new Error("Not found!");
    err.status = 404;
    next(err);
}
});

router.post('/', function(req,res,next){
let nuevaPizza = new Pizza ({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    listaDeIngredientes: req.body.listaDeIngredientes,
    tipoDeMasa: req.body.tipoDeMasa,
    tamanio: req.body.tamanio,
    porciones: req.body.porciones,
    extraQueso: req.body.extraQueso
});
/*Pizza.remove({}, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('success');
    }
});*/
nuevaPizza.save(function(err) {
    if (err) throw err;
    console.log('Pizza saved successfully!');
});
res.status(201).end();
});

router.put('/:pizzaToEdit', function(req, res, next){
var pizza = pizzasList[req.params.pizzaToEdit];
console.log("ID: "+pizza._id);
newPizza = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    listaDeIngredientes: req.body.listaDeIngredientes,
    tipoDeMasa: req.body.tipoDeMasa,
    tamanio: req.body.tamanio,
    porciones: req.body.porciones,
    extraQueso: req.body.extraQueso
}
Pizza.findByIdAndUpdate(pizza._id, {nombre:newPizza.nombre, descripcion:newPizza.descripcion,listaDeIngredientes:newPizza.listaDeIngredientes,tipoDeMasa:newPizza.tipoDeMasa,tamanio:newPizza.tamanio,porciones:newPizza.porciones,extraQueso:newPizza.extraQueso}, function(err, pizzaToE) {
    if (err) throw err;
    // we have the updated user returned to us
});

if(newPizza){
    Pizza.find({}, function(err, pizzaToList) {
        if (err) throw err;
        // object of all the pizzas
        pizzasList = pizzaToList;
        res.send(pizzaToList);
    });
    res.status(200);
}
else{
    let err = new Error("No Content!");
    err.status = 204;
    next(err);
}
});


router.delete('/:pizzaToDelete', function(req, res, next){
var pizza = pizzasList[req.params.pizzaToDelete]; 
Pizza.findByIdAndRemove(pizza._id, function(err) {
    if (err) throw err;
    // we have deleted the user
});
if(pizza){
    Pizza.find({}, function(err, pizzaToList) {
        if (err) throw err;
        // object of all the pizzas
        pizzasList = pizzaToList;
        res.send(pizzaToList);
    });
    res.status(200);
}
else{
    let err = new Error("No content!");
    err.status = 204;
    next(err);
}
});

module.exports = router;