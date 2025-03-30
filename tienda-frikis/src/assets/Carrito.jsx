import React, { useState, useEffect } from "react";
import "./estilos.css";

const MAX_COPIAS = 20;

const Carrito = ({ carrito, setCarrito }) => {
  const [total, setTotal] = useState(0);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [descuentoJuegos, setDescuentoJuegos] = useState(0);
  const [mensajeDescuento, setMensajeDescuento] = useState(null);


  // 🧮 Calcular total cada vez que cambia el carrito o se aplica un descuento
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
  }, [carrito, descuentoAplicado]);

  const calcularTotal = () => {
    let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    let descuentoJuegos = 0;

    const juegosDeMesa = carrito.filter(item => item.tipo === "T5");
    if (juegosDeMesa.length > 0 && total > 30) {
      descuentoJuegos = total * 0.15;
      total -= descuentoJuegos;
    }

    setDescuentoJuegos(descuentoJuegos);
    setTotal(total.toFixed(2));
  };

  // 🧾 Aplicar código de descuento
  const aplicarCodigoDescuento = () => {
    if (codigoDescuento === "INVIERNO25" && !descuentoAplicado) {
      setDescuentoAplicado(true);
      setMensajeDescuento({ tipo: "exito", texto: "✅ Descuento aplicado correctamente." });
    } else {
      setMensajeDescuento({ tipo: "error", texto: "❌ Código no válido o ya aplicado." });
    }
    setCodigoDescuento("");
  
    // Limpiar mensaje tras 3 segundos
    setTimeout(() => setMensajeDescuento(null), 3000);
  };

  // 🗑️ Eliminar productos (excepto el descuento)
  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  // 🔄 Modificar cantidades (excepto el descuento)
  const modificarCantidad = (id, cambio) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) => {
        if (item.id === id) {
          let nuevaCantidad = item.cantidad + cambio;
          if (nuevaCantidad > MAX_COPIAS) {
            nuevaCantidad = MAX_COPIAS;
          } else if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
          }
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      })
    );
  };

  // 🎁 Añadir o actualizar el producto "Descuento 5%" dinámicamente
  useEffect(() => {
    if (descuentoAplicado) {
      const totalSinDescuento = carrito
        .filter((item) => item.nombre !== "Descuento 5%")
        .reduce((sum, item) => sum + item.precio * item.cantidad, 0);

      const descuento = parseFloat((totalSinDescuento * 0.05).toFixed(2));
      const yaExiste = carrito.find((item) => item.nombre === "Descuento 5%");

      if (totalSinDescuento === 0) {
        setCarrito((prev) => prev.filter((item) => item.nombre !== "Descuento 5%"));
        setDescuentoAplicado(false);
      } else if (!yaExiste) {
        setCarrito((prev) => [
          ...prev,
          {
            id: "descuento",
            nombre: "Descuento 5%",
            precio: -descuento,
            cantidad: 1,
            tipo: "descuento",
            imagen: "/imagenes/descuento5.jpg",
          },
        ]);
      } else {
        setCarrito((prev) =>
          prev.map((item) =>
            item.nombre === "Descuento 5%"
              ? { ...item, precio: -descuento }
              : item
          )
        );
      }
    }
  }, [carrito, descuentoAplicado]);

  return (
    <div
      className="offcanvas offcanvas-start show"
      id="offcanvasCarrito"
      tabIndex="-1"
      aria-labelledby="offcanvasCarritoLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCarritoLabel">
          Carrito de Compras
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() =>
            document.getElementById("offcanvasCarrito").classList.remove("show")
          }
        >
          ✖
        </button>
      </div>

      <div className="offcanvas-body">
        {carrito.length === 0 ? (
          <p className="text-muted">El carrito está vacío</p>
        ) : (
          carrito.map((producto) => (
            <div
              key={producto.id}
              className="col-12 mb-3 d-flex align-items-center"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                width="50"
                className="me-3"
              />
              <div className="flex-grow-1">
                <h6>{producto.nombre}</h6>
                <p>
                  {producto.precio}€ x {producto.cantidad} ={" "}
                  {(producto.precio * producto.cantidad).toFixed(2)}€
                </p>

                {/* Cantidad solo editable si no es el producto descuento */}
                {producto.nombre !== "Descuento 5%" ? (
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => modificarCantidad(producto.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{producto.cantidad}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => modificarCantidad(producto.id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="mx-2">1 unidad</span>
                )}
              </div>

              {/* Botón eliminar solo si no es descuento */}
              {producto.nombre !== "Descuento 5%" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  X
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div className="offcanvas-footer">
      {mensajeDescuento && (
  <div
    className={`alert ${
      mensajeDescuento.tipo === "exito" ? "alert-success" : "alert-danger"
    } py-2 px-3 mb-2`}
  >
    {mensajeDescuento.texto}
  </div>
)}

        <p>Total: {total} €</p>

        {/* Descuento por juegos de mesa */}
        {descuentoJuegos > 0 && (
          <div className="descuento-aplicado">
            <img src="/imagenes/descuento5.jpg" alt="Descuento 15%" width="50" />
            <p>-{descuentoJuegos.toFixed(2)}€ por Juegos de Mesa</p>
          </div>
        )}

        {/* Código descuento manual */}
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
