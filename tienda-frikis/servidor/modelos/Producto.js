// servidor/modelos/Producto.js
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    tipo: String,
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String,
    extra: String
});

module.exports = mongoose.model("Producto", productoSchema);
