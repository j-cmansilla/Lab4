var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pizzaSchema = new Schema({
  nombre:  String,
  descripcion: String,
  listaDeIngredientes:  String,
  tipoDeMasa:  String,
  tamanio:  String,
  porciones:  String,
  extraQueso:  String
});

var Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;