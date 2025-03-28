import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./../assets/estilos.css";

const fileTypes = ["JPG", "PNG", "GIF"];

const FormularioNuevosProductos = ({ agregarProducto, estaOffline }) => {
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProducto({ ...producto, imagen: reader.result });
    };
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarProducto(producto);
    setProducto({ tipo: "", nombre: "", precio: "", descripcion: "", imagen: "" });
  };

  return (
    <aside className={estaOffline ? "formulario-desactivado" : ""}>
      <h4>Añadir Producto</h4>

      {estaOffline && (
        <div className="alert alert-danger text-center mt-2" role="alert">
          ⚠️ Estás desconectado. No puedes añadir productos ahora.
        </div>
      )}

      <form onSubmit={manejarEnvio}>
        <fieldset disabled={estaOffline}>
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

          <FileUploader handleChange={manejarImagen} name="file" types={fileTypes} />
          {producto.imagen && <img src={producto.imagen} alt="Vista previa" width="100" />}

          <button type="submit">Subir Producto</button>
        </fieldset>
      </form>
    </aside>
  );
};

export default FormularioNuevosProductos;
