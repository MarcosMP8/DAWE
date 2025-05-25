const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  telefono: String,
  direccion: String,
  edad: Number,
  rol: { type: String, default: "" } // "" para usuarios sin rol, "admin" para administradores
});

module.exports = mongoose.model("Usuario", usuarioSchema, "usuarios");
