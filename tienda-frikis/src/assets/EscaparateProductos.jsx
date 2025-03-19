import React from "react";

const EscaparateProductos = ({ productos }) => {
  return (
    <section>
      <div id="contenedorProductos" className="row">
        {productos.map((producto) => (
          <article key={producto.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="text-muted">{producto.precio}€</p>
                <p className="card-text">{producto.descripcion}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EscaparateProductos;