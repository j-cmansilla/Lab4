var pizzaCount = 1;
var pizzaCountLista = 0;
var listaDePizzas;

function eliminarPizza(pizzaToDelete){
    var pizza = listaDePizzas[pizzaToDelete];
    $.ajax({
        url: "/pizzas"+pizza.nombre,
        method: 'DELETE',
        type: 'json',
        data: {"nombre": pizza.nombre},
        success: function(res){
            if(res.sucess){
                alert('Pizza encontrada!!');
            }
        }
    });
}

function editarPizza(pizzaToEdit){

} 

function agregarPizza(){
    var nombre = document.getElementById('nombrePizza').value;
    var descripcion = document.getElementById('descripcionPizza').value;
    var listaIngredientes = document.getElementById('listaIngredientes').value;
    var tipoDeMasa = document.getElementById('tipoDeMasa').value;
    var cantidadDePorciones = document.getElementById('cantidadDePorciones').value;
    var extraQueso; 
    var tamanio;
    if(document.getElementById('siExtraQueso').checked){
        extraQueso = "Si";
    }else{
        extraQueso = "No";
    }

    if(document.getElementById('peque').checked){
        tamanio = "Pequeña";
    }
    if(document.getElementById('mediana').checked){
        tamanio = "Mediana";
    }
    if(document.getElementById('grande').checked){
        tamanio = "Grande";
    }

    var nuevaPizzaCreada = {
        "nombre": nombre, 
        "descripcion": descripcion, 
        "listaDeIngredientes": ingredientes, 
        "tipoDeMasa":tipoDeMasa,
        "tamanio": tamanio,
        "porciones": cantidadDePorciones, 
        "extraQueso": extraQueso
    }

    var ingredientes = listaIngredientes.split(",");
    $.ajax({
        url: "/pizzas",
        method: 'POST',
        type: 'json',
        data: nuevaPizzaCreada,
        success: function(res){
            listaDePizzas = res;
            $('#pizzaTable').append(`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button type="button" id="eliminarPizza" class="btn btn-danger"onclick="eliminarPizza(${pizzaCountLista});">Eliminar</button><button type="button" id="eliminarPizza" class="btn btn-success" onclick="editarPizza(${pizzaCountLista});">Editar</button></td></tr>`);
            var table = document.getElementById('pizzaTable');
            table.rows[pizzaCount].cells[0].innerHTML = res[pizzaCountLista].nombre;
            table.rows[pizzaCount].cells[1].innerHTML = res[pizzaCountLista].descripcion;
            table.rows[pizzaCount].cells[2].innerHTML = listaIngredientes;
            table.rows[pizzaCount].cells[3].innerHTML = res[pizzaCountLista].tipoDeMasa;
            table.rows[pizzaCount].cells[4].innerHTML = res[pizzaCountLista].tamanio;
            table.rows[pizzaCount].cells[5].innerHTML = res[pizzaCountLista].porciones;
            table.rows[pizzaCount].cells[6].innerHTML = res[pizzaCountLista].extraQueso;
            pizzaCount++;
            pizzaCountLista++;
            if(res.sucess){
                alert('Pizza agregada!');
                textCipher.value = res.token;
            }
        }
    });
    //cleanData();
}

function cleanData(){
    document.getElementById('nombrePizza').value = "";
    document.getElementById('descripcionPizza').value = "";
    document.getElementById('listaIngredientes').value = "";
    document.getElementById('tipoDeMasa').value = "";
    document.getElementById('cantidadDePorciones').value = "";
    document.getElementById('peque').checked = true;
    document.getElementById('siExtraQueso').checked = true;
}

function updateAfterSearch(res){
    var table = document.getElementById('pizzaTable');
    table.rows[1].cells[0].innerHTML = res.nombre;
    table.rows[1].cells[1].innerHTML = res.descripcion;
    table.rows[1].cells[2].innerHTML = res.listaDeIngredientes;
    table.rows[1].cells[3].innerHTML = res.tipoDeMasa;
    table.rows[1].cells[4].innerHTML = res.tamanio;
    table.rows[1].cells[5].innerHTML = res.porciones;
    table.rows[1].cells[6].innerHTML = res.extraQueso;
}

function buscarPizza(){
    var nombre = document.getElementById('nombrePizzaBuscar').value;
    $.ajax({
        url: "/pizzas/BuscarPorNombre",
        method: 'POST',
        type: 'json',
        data: {"nombre": nombre},
        success: function(res){
            if(res.sucess){
                alert('Pizza encontrada!!');
            }
        }
    });
}
