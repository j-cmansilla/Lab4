var pizzaCount = 1;
var pizzaCountLista = 0;
var listaDePizzas = [];
var pizzaToEd;

function refreshList(){
    pizzaCount = 1;
    pizzaCountLista = 0;
    $('#pizzaTable tbody').html("");
    for(var i = 0; i<listaDePizzas.length;i++){
        $('#pizzaTable tbody').append(`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button type="button" id="eliminarPizza" class="btn btn-danger"onclick="eliminarPizza(${pizzaCountLista});">Eliminar</button><button type="button" id="eliminarPizza" class="btn btn-success" onclick="editarPizza(${pizzaCountLista});">Editar</button></td></tr>`);
        var table = document.getElementById('pizzaTable');
        table.rows[pizzaCount].cells[0].innerHTML = listaDePizzas[pizzaCountLista].nombre;
        table.rows[pizzaCount].cells[1].innerHTML = listaDePizzas[pizzaCountLista].descripcion;
        table.rows[pizzaCount].cells[2].innerHTML = listaDePizzas[pizzaCountLista].listaDeIngredientes;
        table.rows[pizzaCount].cells[3].innerHTML = listaDePizzas[pizzaCountLista].tipoDeMasa;
        table.rows[pizzaCount].cells[4].innerHTML = listaDePizzas[pizzaCountLista].tamanio;
        table.rows[pizzaCount].cells[5].innerHTML = listaDePizzas[pizzaCountLista].porciones;
        table.rows[pizzaCount].cells[6].innerHTML = listaDePizzas[pizzaCountLista].extraQueso;
        pizzaCount++;
        pizzaCountLista++;
    }
}

function guardarCambios(){
    var nombre = document.getElementById('nombrePizza').value;
    var descripcion = document.getElementById('descripcionPizza').value;
    var listaIngredientes = document.getElementById('listaIngredientes').value;
    var tipoDeMasa = document.getElementById('tipoDeMasa').value;
    var cantidadDePorciones = document.getElementById('cantidadDePorciones').value;
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
        "listaDeIngredientes": listaIngredientes, 
        "tipoDeMasa":tipoDeMasa,
        "tamanio": tamanio,
        "porciones": cantidadDePorciones, 
        "extraQueso": extraQueso
    }
    //module.exports = nuevaPizzaCreada;
    let url = '/pizzas/'+pizzaToEd;
    $.ajax({
        url: url,
        method: 'PUT',
        type: 'json',
        data: nuevaPizzaCreada,
        success: function(res){
            listaDePizzas = res;
            refreshList();
        }
    });
    cancelarCambios();
}

function eliminarPizza(pizzaToDelete){
    cancelarCambios();
    var pizza = listaDePizzas[pizzaToDelete];
    if(pizza.nombre == ""){
        pizza = {
            nombre: "null"
        }  
    }
    var url = "/pizzas/"+pizzaToDelete;
    $.ajax({
        url: url,
        method: 'DELETE',
        type: 'json',
        data: {"nombre": pizza.nombre},
        success: function(res){
            listaDePizzas = res;
            refreshList();
            if(res.sucess){
                alert('Pizza eliminada!!');
            }
        }
    });
}

function validateData(){
    var nombre = document.getElementById('nombrePizza').value;
    var descripcion = document.getElementById('descripcionPizza').value;
    var listaIngredientes = document.getElementById('listaIngredientes').value;
    var tipoDeMasa = document.getElementById('tipoDeMasa').value;
    var cantidadDePorciones = document.getElementById('cantidadDePorciones').value;
    if(nombre == "" || descripcion == "" || listaIngredientes == "" || tipoDeMasa == "" || cantidadDePorciones ==""){
        return false;
    }
    return true;
}

$(function(){
    $('table').on('click', function(){
    });
});

function cancelarCambios(){
    cleanData();
    $('#agregarPizza').prop('disabled', false);
    $('#editarPizza').prop('disabled', true);
    $('#btnCancelar').prop('disabled', true);
}

function editarPizza(pizzaToEdit){
    pizzaToEd = pizzaToEdit;
    $(window).scrollTop(0);
    $('#agregarPizza').prop('disabled', true);
    $('#editarPizza').prop('disabled', false);
    $('#btnCancelar').prop('disabled', false);
    var pizza = listaDePizzas[pizzaToEdit];
    document.getElementById('nombrePizza').value = pizza.nombre;
    document.getElementById('descripcionPizza').value = pizza.descripcion;
    document.getElementById('listaIngredientes').value = pizza.listaDeIngredientes;
    document.getElementById('tipoDeMasa').value = pizza.tipoDeMasa;
    document.getElementById('cantidadDePorciones').value = pizza.porciones;
    if(pizza.tamanio === "Pequeña"){
        document.getElementById('peque').checked = true;
    }
    if(pizza.tamanio === "Mediana"){
        document.getElementById('mediana').checked = true;
    }
    if(pizza.tamanio === "Grande"){
        document.getElementById('grande').checked = true;
    }
    if(pizza.extraQueso === "Si"){
        document.getElementById('siExtraQueso').checked = true;
    }else{
        document.getElementById('noExtraQueso').checked = true;
    }
} 

function agregarPizza(){
    if(!validateData()){
        alert("Por favor llene todos los campos!")
        return;
    }
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

    var ingredientes = listaIngredientes.split(",");
    
    var nuevaPizzaCreada = {
        "nombre": nombre, 
        "descripcion": descripcion, 
        "listaDeIngredientes": listaIngredientes, 
        "tipoDeMasa":tipoDeMasa,
        "tamanio": tamanio,
        "porciones": cantidadDePorciones, 
        "extraQueso": extraQueso
    }
    $.ajax({
        url: "/pizzas",
        method: 'POST',
        type: 'json',
        data: nuevaPizzaCreada,
        success: function(res){
            listaDePizzas = res;
            $('#pizzaTable tbody').append(`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button type="button" id="eliminarPizza" class="btn btn-danger"onclick="eliminarPizza(${pizzaCountLista});">Eliminar</button><button type="button" id="eliminarPizza" class="btn btn-success" onclick="editarPizza(${pizzaCountLista});">Editar</button></td></tr>`);
            var table = document.getElementById('pizzaTable');
            table.rows[pizzaCount].cells[0].innerHTML = res[pizzaCountLista].nombre;
            table.rows[pizzaCount].cells[1].innerHTML = res[pizzaCountLista].descripcion;
            table.rows[pizzaCount].cells[2].innerHTML = res[pizzaCountLista].listaDeIngredientes;
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
    cleanData();
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
