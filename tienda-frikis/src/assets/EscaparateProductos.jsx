
import React, { useState } from "react";
import DetallesProducto from "./DetallesProducto";
import BuscadorProductos from "./BuscadorProductos";

const EscaparateProductos = ({ productos, agregarAlCarrito, busqueda, setBusqueda }) => {
  const DIVISA = "€";
  const [productoAgregadoId, setProductoAgregadoId] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setProductoAgregadoId(producto.id);
    setTimeout(() => setProductoAgregadoId(null), 1000);
  };

  return (
    <section className="container mt-3">
      <h2 className="mb-3">Todos los productos</h2>
      <BuscadorProductos valorBusqueda={busqueda} onBuscar={setBusqueda} />

      <div id="contenedorProductos" className="row">
        {productos.length === 0 ? (
          <p className="text-muted">No hay productos disponibles</p>
        ) : (
          productos.map((producto) => (
            <article key={producto.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  onClick={() => setProductoSeleccionado(producto)}
                  style={{ cursor: "pointer" }}
                  onError={(e) => (e.target.src = "/imagenes/ProductoSinImagen.png")}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="text-muted">
                    {producto.precio} {DIVISA}
                  </p>
                  <p className="card-text">{producto.descripcion}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAgregar(producto)}
                  >
                    {productoAgregadoId === producto.id
                      ? "Producto añadido ✅"
                      : "Agregar al carrito 🛒"}
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <DetallesProducto
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </section>
  );
};

export default EscaparateProductos;
