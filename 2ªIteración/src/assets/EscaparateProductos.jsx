import React, { useState } from "react";
import DetallesProducto from "./DetallesProducto";
import BuscadorProductos from "./BuscadorProductos";
import { obtenerCampoAdicional } from "../tienda/tienda";

const EscaparateProductos = ({
  productos = [],
  agregarAlCarrito,
  busqueda,
  setBusqueda
}) => {
  const DIVISA = "€";
  const [productoAgregadoId, setProductoAgregadoId] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 🧪 Logs de depuración
  console.log("🛒 productos recibidos:", productos);
  console.log("🔎 búsqueda actual:", busqueda);

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setProductoAgregadoId(producto._id);
    setTimeout(() => setProductoAgregadoId(null), 1000);
  };

  // 🔍 Filtro robusto
  const productosFiltrados = Array.isArray(productos)
    ? (
        busqueda.trim()
          ? productos.filter((p) =>
              p.nombre.toLowerCase().includes(busqueda.toLowerCase())
            )
          : productos
      )
    : [];

  return (
    <section className="container mt-3">
      <BuscadorProductos valorBusqueda={busqueda} onBuscar={setBusqueda} />

      <div id="contenedorProductos" className="row">
        {productosFiltrados.length === 0 ? (
          <p className="text-muted">No hay productos disponibles</p>
        ) : (
          productosFiltrados.map((producto) => (
            <article key={producto._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={producto.imagen || "/imagenes/sinImagen.png"}
                  className="card-img-top"
                  alt={producto.nombre}
                  onClick={() => setProductoSeleccionado(producto)}
                  style={{ cursor: "pointer" }}
                  onError={(e) => (e.target.src = "/imagenes/sinImagen.png")}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="text-muted">
                    {producto.precio} {DIVISA}
                  </p>
                  <p className="card-text">{producto.descripcion}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: obtenerCampoAdicional(producto),
                    }}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAgregar(producto)}
                  >
                    {productoAgregadoId === producto._id
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
