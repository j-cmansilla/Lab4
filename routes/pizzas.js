var express = require('express');
var router = express.Router();

var pizzas = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json(pizzas);
    res.send(pizzas);
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
console.log("Estas buscando: "+nombrePizza);
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
console.log(req.body);
let nuevaPizza = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    listaDeIngredientes: req.body.listaDeIngredientes,
    tipoDeMasa: req.body.tipoDeMasa,
    tamanio: req.body.tamanio,
    porciones: req.body.porciones,
    extraQueso: req.body.extraQueso
}
pizzas.push(nuevaPizza);
res.send(pizzas);
sucess: true;
res.status(201).end();
});

router.put('/:nombre', function(req, res, next){
var nombrePizza = req.params.nombre;
let pizza = pizzas.find(x=>x.nombre === nombrePizza);
let temp = pizzas.filter(x=>x.nombre !== nombrePizza);
if(pizza){
    pizza = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        listaDeIngredientes: req.body.listaDeIngredientes,
        tipoDeMasa: req.body.tipoDeMasa,
        tamanio: req.body.tamanio,
        porciones: req.body.porciones,
        extraQueso: req.body.extraQueso
    }
    temp.push(pizza);
    pizzas = temp;
}
else{
    let err = new Error("Not found!");
    err.status = 404;
    next(err);
}
});


router.delete('/:nombre', function(req, res, next){
var nombrePizza = req.params.nombre;   
console.log("Eliminar: "+nombrePizza); 
let pizza = pizzas.find(x=>x.nombre === nombrePizza);
let temp = pizzas.filter(x=>x.nombre !== nombrePizza);
if(pizza){
    pizzas = temp;
    res.send(pizzas);
}
else{
    let err = new Error("Not found!");
    err.status = 404;
    next(err);
}
});

module.exports = router;