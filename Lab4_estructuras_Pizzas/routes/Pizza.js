var lista = [];
//nombre, una descripción, listado de ingredientes (array), tipo de masa, tamaño, cantidad de porciones, tiene o no extra queso.  
function addNewPizza(name,desc,
   // items,
    dough,size,portions,chese)
{
    var getname = document.getElementById(name);
    var getdesc = document.getElementById(desc);
    //var getitems = document.getElementById(items);
    var getdough = document.getElementById(dough);
    var getsize = document.getElementById(size);
    var getportcount = document.getElementById(portions);
    var getcheese = document.getElementById(chese);
    var getpizzas = document.getElementById(pizza);

     var Pizza = {name: getname.value,
              descrip: getdesc.value,
              //items: getitems, 
              doughtype: getdough.value,
              size: getsize.value, 
              portions: getportcount.value, 
              chese: getcheese.value
     };
     lista.push(Pizza);
     
     var txt = `pizza = {
        nombre: "${Pizza.name}",
        descrip: ${Pizza.descrip},
        cheese: ${Pizza.chese}
    }\n`
    getpizzas.innerHTML = getpizzas.innerHTML + txt;
    getname.innerHTML = "";
    getdesc.innerHTML = "";
    getdough.innerHTML = "";
    getportcount.innerHTML = "";
    getsize.innerHTML = "";
}

let rutas = [{
    method: 'GET',
    path:'/routes/Pizza', 
    handler: function (request, reply) {
        reply.file('./routes/Pizza.html');
    }
},{  method: 'POST',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}, {
    method: 'PUT',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}, {
    method: 'DELETE',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}];

module.exports = rutas;