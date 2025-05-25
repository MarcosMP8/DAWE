const express = require("express");
const router = express.Router();
const Producto = require("../modelos/Producto");

// Obtener todos los productos
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  

  try {
    const filtro = search
      ? { nombre: { $regex: search, $options: "i" } }
      : {};
      const total = await Producto.countDocuments(filtro);
      const productos = await Producto.find(filtro).skip(skip).limit(limit);

    res.json({ productos, total });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Añadir nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json({ mensaje: "Producto creado", producto: nuevo });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ error: error.message });
  }
});

// Actualizar producto individual (ahora devuelve el documento actualizado)
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(400).json({ error: error.message });
  }
});

// *** Nuevo endpoint: borrar varios productos ***
router.delete("/", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "El body debe incluir un array 'ids'" });
  }
  try {
    await Producto.deleteMany({ _id: { $in: ids } });
    res.json({ mensaje: "Productos borrados", count: ids.length });
  } catch (error) {
    console.error("Error al borrar productos:", error);
    res.status(500).json({ error: "Error al borrar productos" });
  }
});

// Borrar un producto individual
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto borrado" });
  } catch (error) {
    console.error("Error al borrar producto:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
