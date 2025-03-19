import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const FormularioNuevosProductos = ({ agregarProducto }) => {
  const [producto, setProducto] = useState({
    tipo: "",
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const manejarCambio = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const manejarImagen = (file) => {
    const urlImagen = URL.createObjectURL(file);
    setProducto({ ...producto, imagen: urlImagen });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarProducto(producto);
    setProducto({ tipo: "", nombre: "", precio: "", descripcion: "", imagen: "" });
  };

  return (
    <aside>
      <h4>Añadir Producto</h4>
      <form onSubmit={manejarEnvio}>
        <select name="tipo" value={producto.tipo} onChange={manejarCambio}>
          <option value="" disabled>Escoge un tipo</option>
          <option value="T1">Videojuego</option>
          <option value="T2">Libro</option>
          <option value="T3">Merchandising</option>
          <option value="T4">Puzzle</option>
          <option value="T5">Juego de Mesa</option>
        </select>

        <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={manejarCambio} />
        <input type="number" name="precio" placeholder="Precio" value={producto.precio} onChange={manejarCambio} />
        <textarea name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={manejarCambio}></textarea>

        {/* Drag & Drop de imágenes */}
        <FileUploader handleChange={manejarImagen} name="file" types={fileTypes} />

        {/* Vista previa de la imagen */}
        {producto.imagen && <img src={producto.imagen} alt="Vista previa" width="100" />}

        <button type="submit">Subir Producto</button>
      </form>
    </aside>
  );
};

export default FormularioNuevosProductos;