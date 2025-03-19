import React from "react";

const EscaparateProductos = ({ productos, agregarAlCarrito }) => {
  console.log("Productos recibidos en EscaparateProductos:", productos);

  return (
    <section>
      <div id="contenedorProductos" className="row">
        {productos.length === 0 ? (
          <p className="text-muted">No hay productos disponibles</p>
        ) : (
          productos.map((producto) => (
            <article key={producto.id} className="col-md-4 mb-4">
              <div className="card">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} onError={(e) => e.target.src = "/imagenes/ProductoSinImagen.png"} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="text-muted">{producto.precio}€</p>
                  <p className="card-text">{producto.descripcion}</p>
                  <button className="btn btn-primary mt-2" onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito 🛒
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default EscaparateProductos;