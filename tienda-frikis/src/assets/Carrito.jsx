import React, { useState, useEffect } from "react";

const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const Carrito = ({ carrito, setCarrito }) => {
  const [total, setTotal] = useState(0);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [descuentoJuegos, setDescuentoJuegos] = useState(0);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
  }, [carrito, descuentoAplicado]);

  const calcularTotal = () => {
    let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    let descuentoJuegos = 0;

    // Descuento automático del 15% en juegos de mesa si hay al menos uno y el total supera 30€
    const juegosDeMesa = carrito.filter(item => item.tipo === "T5");
    if (juegosDeMesa.length > 0 && total > 30) {
      descuentoJuegos = total * 0.15;
      total -= descuentoJuegos;
    }
    setDescuentoJuegos(descuentoJuegos);

    // Aplicar código de descuento manual (ejemplo: "INVIERNO25" da un 5%)
    if (codigoDescuento === "INVIERNO25" && !descuentoAplicado) {
      total *= 0.95;
      setDescuentoAplicado(true);
    }

    setTotal(total.toFixed(2));
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  const aplicarCodigoDescuento = () => {
    if (codigoDescuento === "INVIERNO25" && !descuentoAplicado) {
      setDescuentoAplicado(true);
      calcularTotal();
    }
  };

  const modificarCantidad = (id, cambio) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(10, Math.max(1, item.cantidad + cambio)) }
          : item
      )
    );
  };

  return (
    <div className="offcanvas offcanvas-start show" id="offcanvasCarrito" tabIndex="-1" aria-labelledby="offcanvasCarritoLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCarritoLabel">Carrito de Compras</h5>
        <button type="button" className="btn-close" onClick={() => document.getElementById("offcanvasCarrito").classList.remove("show")}>
         ✖
        </button>
      </div>
      <div className="offcanvas-body">
        {carrito.length === 0 ? (
          <p className="text-muted">El carrito está vacío</p>
        ) : (
          carrito.map((producto) => (
            <div key={producto.id} className="col-12 mb-3 d-flex align-items-center">
              <img src={producto.imagen} alt={producto.nombre} width="50" className="me-3" />
              <div className="flex-grow-1">
                <h6>{producto.nombre}</h6>
                <p>{producto.precio}€ x {producto.cantidad} = {(producto.precio * producto.cantidad).toFixed(2)}€</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-secondary btn-sm" onClick={() => modificarCantidad(producto.id, -1)}>-</button>
                  <span className="mx-2">{producto.cantidad}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => modificarCantidad(producto.id, 1)}>+</button>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(producto.id)}>X</button>
            </div>
          ))
        )}
      </div>
      <div className="offcanvas-footer">
        <p>Total: {total} €</p>

        {/* Mostrar descuento automático de juegos de mesa */}
        {descuentoJuegos > 0 && (
          <div className="descuento-aplicado">
            <img src="/imagenes/descuento5.jpg" alt="Descuento 15%" width="50" />
            <p>-{descuentoJuegos.toFixed(2)}€ por Juegos de Mesa</p>
          </div>
        )}

        {/* Código de descuento manual */}
        <input
          type="text"
          placeholder="Código de descuento"
          value={codigoDescuento}
          onChange={(e) => setCodigoDescuento(e.target.value)}
        />
        <button className="btn btn-success btn-sm" onClick={aplicarCodigoDescuento}>
          Aplicar Código
        </button>
      </div>
    </div>
  );
};

export default Carrito;