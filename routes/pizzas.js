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

router.put('/:pizzaToEdit', function(req, res, next){
var pizzaToEdit = req.params.pizzaToEdit;
newPizza = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    listaDeIngredientes: req.body.listaDeIngredientes,
    tipoDeMasa: req.body.tipoDeMasa,
    tamanio: req.body.tamanio,
    porciones: req.body.porciones,
    extraQueso: req.body.extraQueso
}
for(var i = 0; i < pizzas.length;i++){
    if(pizzaToEdit == +i){
        pizzas[i] = newPizza;
    }
}
if(newPizza){
    res.sucess = true;
    res.send(pizzas);
    res.status(200);
}
else{
    let err = new Error("No Content!");
    err.status = 204;
    next(err);
}
});


router.delete('/:pizzaToDelete', function(req, res, next){
var nombrePizza = pizzas[req.params.pizzaToDelete].nombre; 
var pizzaToDelete = req.params.pizzaToDelete;  
let pizza = pizzas.find(x=>x.nombre === nombrePizza);
//let temp = pizzas.filter(x=>x.nombre !== nombrePizza);
let tempTwo = [];
for(var i = 0;i<pizzas.length;i++){
    if(pizzaToDelete == +i){
    }else{
        tempTwo.push(pizzas[i]);
    }
}

if(pizza){
    res.status(200);
    pizzas = tempTwo;
    if(tempTwo.length == 0){
        var pizzasNull = [];
        res.send(pizzasNull)
    }else{
        res.send(pizzas);
    }
}
else{
    let err = new Error("No content!");
    err.status = 204;
    next(err);
}
});

module.exports = router;