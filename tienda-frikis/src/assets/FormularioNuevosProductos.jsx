import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./../assets/estilos.css";

const fileTypes = ["JPG", "PNG", "GIF"];
const DEFAULT_IMAGE = "/imagenes/sinImagen.png";

const FormularioNuevosProductos = ({ agregarProducto, estaOffline }) => {
  const [producto, setProducto] = useState({
    tipo: "",
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    extra: "",
  });

  const manejarCambio = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const manejarImagen = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProducto((prev) => ({ ...prev, imagen: reader.result }));
    };
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (estaOffline) return;

    // Convertir y validar precios y extra
    const precioNum = parseFloat(producto.precio);
    const extraNum =
      producto.tipo === "T4" || producto.tipo === "T5"
        ? parseInt(producto.extra, 10)
        : null;

    if (
      !producto.tipo ||
      !producto.nombre.trim() ||
      isNaN(precioNum) ||
      precioNum < 0 ||
      !producto.descripcion.trim()
    ) {
      alert("❌ El nombre, la descripción y un precio ≥ 0 son obligatorios.");
      return;
    }

    if ((producto.tipo === "T4" || producto.tipo === "T5") &&
        (isNaN(extraNum) || extraNum < 0)
    ) {
      const label = producto.tipo === "T4"
        ? "Número de piezas"
        : "Número de jugadores";
      alert(`❌ ${label} debe ser un entero ≥ 0.`);
      return;
    }

    // Si no hay imagen, usar la por defecto
    const imagenFinal = producto.imagen || DEFAULT_IMAGE;

    const productoAEnviar = {
      tipo: producto.tipo,
      nombre: producto.nombre.trim(),
      precio: precioNum,
      descripcion: producto.descripcion.trim(),
      infoExtra:
        producto.tipo === "T4" || producto.tipo === "T5"
          ? extraNum
          : producto.extra.trim(),
      imagen: imagenFinal,
    };

    console.log("📤 Enviando producto:", productoAEnviar);
    try {
      await agregarProducto(productoAEnviar);
      alert("✅ Producto subido con éxito.");
      setProducto({
        tipo: "",
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        extra: "",
      });
    } catch (err) {
      console.error("❌ Error en agregarProducto:", err);
      alert("❌ No se pudo subir el producto. Revisa la consola.");
    }
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
          <select
            name="tipo"
            value={producto.tipo}
            onChange={manejarCambio}
            className="form-select mb-2"
          >
            <option value="" disabled>
              Escoge un tipo
            </option>
            <option value="T1">Videojuego</option>
            <option value="T2">Libro</option>
            <option value="T3">Merchandising</option>
            <option value="T4">Puzzle</option>
            <option value="T5">Juego de Mesa</option>
          </select>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={producto.nombre}
            onChange={manejarCambio}
            className="form-control mb-2"
          />

          <input
            type="number"
            name="precio"
            placeholder="Precio"
            min="0"
            step="1"
            value={producto.precio}
            onChange={manejarCambio}
            className="form-control mb-2"
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={manejarCambio}
            className="form-control mb-2"
          />

          {producto.tipo && (
            <input
              type={
                producto.tipo === "T4" || producto.tipo === "T5"
                  ? "number"
                  : "text"
              }
              name="extra"
              placeholder={
                producto.tipo === "T1"
                  ? "Compañía"
                  : producto.tipo === "T2"
                  ? "Editorial"
                  : producto.tipo === "T3"
                  ? "Fabricante"
                  : producto.tipo === "T4"
                  ? "Número de piezas"
                  : "Número de jugadores"
              }
              min={producto.tipo === "T4" || producto.tipo === "T5" ? "0" : undefined}
              value={producto.extra}
              onChange={manejarCambio}
              className="form-control mb-2"
            />
          )}

          <div style={{ position: "relative" }} className="mb-3">
            <FileUploader
              handleChange={manejarImagen}
              name="file"
              types={fileTypes}
              classes="file-uploader"
            />
            {estaOffline && <div className="overlay-inactivo" />}
          </div>

          {producto.imagen && (
            <img
              src={producto.imagen}
              alt="Vista previa"
              width="100"
              className="mb-3"
            />
          )}

          <button type="submit" className="btn btn-primary w-100">
            Subir Producto
          </button>
        </fieldset>
      </form>
    </aside>
  );
};

export default FormularioNuevosProductos;
