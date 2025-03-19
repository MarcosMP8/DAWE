import React from "react";

const Carrito = ({ carrito }) => {
  return (
    <div className="offcanvas-body">
      <h5>Carrito de Compras</h5>
      <div id="contenedorProductosCarrito" className="row">
        {carrito.length === 0 ? (
          <p className="text-muted">El carrito está vacío</p>
        ) : (
          carrito.map((producto) => (
            <div key={producto.id} className="col-12 mb-3 d-flex align-items-center">
              <img src={producto.imagen} alt={producto.nombre} width="50" className="me-3" />
              <div className="flex-grow-1">
                <h6>{producto.nombre}</h6>
                <p>{producto.precio}€ x {producto.cantidad}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carrito;