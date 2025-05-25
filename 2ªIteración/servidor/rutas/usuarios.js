const express = require("express");
const router = express.Router();
const Usuario = require("../modelos/Usuario");

// Obtener datos del usuario autenticado
// Obtener datos del usuario autenticado y actualizar visitas
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  const usuario = await Usuario.findById(req.session.userId).select("-contraseña");
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // 🔁 Incrementamos visitas en cada recarga
  req.session.visitas = (req.session.visitas || 1) + 1;

  // ✅ Guardamos la sesión y luego respondemos
  req.session.save(err => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al guardar sesión" });
    }

    res.json({
      usuario,
      visitas: req.session.visitas
    });
  });
});



// Iniciar sesión (tras Firebase)
router.post("/login", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email requerido" });

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ error: "Usuario no registrado en MongoDB" });

  const esMismoUsuario = req.session.email === email;
  req.session.email = email;
  req.session.userId = usuario._id;

  req.session.visitas = esMismoUsuario && req.session.visitas
    ? req.session.visitas + 1
    : 1;

  // ✅ Guardamos la sesión de forma explícita
  req.session.save((err) => {
    if (err) return res.status(500).json({ error: "Error al guardar la sesión" });
    res.json({ mensaje: "Sesión iniciada", usuario, visitas: req.session.visitas });
  });
});




// Cerrar sesión
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ mensaje: "Sesión cerrada" });
  console.log("Email recibido:", email);
  console.log("Usuarios en la colección:", usuarios);
});

// Actualizar datos del usuario autenticado
router.put("/me", async (req, res) => {
  const email = req.session.email;
  if (!email) return res.status(401).json({ error: "No autenticado" });

  const { nombre, telefono, direccion, edad } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre no puede estar vacío" });

  await Usuario.updateOne({ email }, { nombre, telefono, direccion, edad });
  res.json({ mensaje: "Datos actualizados" });
});

module.exports = router;
