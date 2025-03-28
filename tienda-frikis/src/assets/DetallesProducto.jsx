import React from "react";
import "./estilos.css"; // Asegúrate de importar los estilos

const DetallesProducto = ({ producto, onClose }) => {
  if (!producto) return null;

  const obtenerCampoAdicional = (producto) => {
    // Personaliza esto según el tipo de producto
    if (producto.tipo === "T5") {
      return <p><strong>Tipo:</strong> Juegos de mesa</p>;
    }
    return null;
  };

  return (
    <>
      {/* Capa oscura de fondo */}
      <div id="div1-opacidad" onClick={onClose}></div>

      {/* Detalles del producto */}
      <div id="div2-detallesProducto">
        <div className="container">
          <div className="row infoProducto">
            <div className="col-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                onError={(e) => e.target.src = "/imagenes/ProductoSinImagen.png"}
              />
            </div>
            <div className="col-8">
              <h3>{producto.nombre}</h3>
              <p><strong>Precio:</strong> {producto.precio}€</p>
              {obtenerCampoAdicional(producto)}
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesProducto;

