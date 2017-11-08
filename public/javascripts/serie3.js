var pizzaCount = 1;
var pizzaCountLista = 0;
var listaDePizzas = [];

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

$( document ).ready(function() {
    console.log('ready');
    $.ajax({
        url: "/pizzas",
        method: 'GET',
        type: 'json',
        success: function(res){
            listaDePizzas = res;
            console.log(listaDePizzas.length);
            if(listaDePizzas.length > 0){
                refreshList();
            }
        }
    });
});

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
        }
    });
    $.ajax({
        url: "/pizzas",
        method: 'GET',
        type: 'json',
        success: function(res){
            listaDePizzas = res;
            console.log(listaDePizzas.length);
            if(listaDePizzas.length > 0){
                refreshList();
            }
        }
    });
    window.location.reload();
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

function cancelarCambios(){
    cleanData();
    $('#agregarPizza').prop('disabled', false);
    $('#editarPizza').prop('disabled', true);
    $('#btnCancelar').prop('disabled', true);
}

function eliminarPizza(pizzaToDelete){
    cancelarCambios();
    var pizza = listaDePizzas[pizzaToDelete];
    var url = "/pizzas/"+pizzaToDelete;
    $.ajax({
        url: url,
        method: 'DELETE',
        type: 'json',
        success: function(res){
            listaDePizzas = res;
            refreshList();
        }
    });
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
    window.location.reload();
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