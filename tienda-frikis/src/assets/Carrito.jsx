import React, { useState, useEffect } from "react";
import "./estilos.css";
import { guardarEnCarrito, borrarDelCarrito } from "../tienda/tienda";

const MAX_CANTIDAD = 20;

const Carrito = ({ carrito, setCarrito }) => {
  
  const [total, setTotal] = useState(0);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [mensajeDescuento, setMensajeDescuento] = useState(null);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
  }, [carrito, descuentoAplicado]);

  const calcularTotal = () => {
    let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    setTotal(total.toFixed(2));
  };

  const aplicarCodigoDescuento = () => {
    if (codigoDescuento === "INVIERNO25" && !descuentoAplicado) {
      setDescuentoAplicado(true);
      setMensajeDescuento({ tipo: "exito", texto: "✅ Descuento aplicado correctamente." });
    } else {
      setMensajeDescuento({ tipo: "error", texto: "❌ Código no válido o ya aplicado." });
    }
    setCodigoDescuento("");

    setTimeout(() => setMensajeDescuento(null), 3000);
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
    borrarDelCarrito(id);
  };
  

  const modificarCantidad = (id, cambio) => {
    setCarrito((prevCarrito) => {
      return prevCarrito.map((item) => {
        if (item.id === id) {
          const nuevaCantidad = Math.min(MAX_CANTIDAD, Math.max(1, item.cantidad + cambio));
          const actualizado = { ...item, cantidad: nuevaCantidad };
          if (item.tipo !== "descuento") {
            guardarEnCarrito(actualizado);
          }
          return actualizado;
        }
        return item;
      });
    });
  };
  

  // Descuento automático del 15% en juegos de mesa (tipo T5)
  useEffect(() => {
    const juegosDeMesa = carrito.filter((item) => item.tipo === "T5");
    const totalJuegos = juegosDeMesa.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const yaExiste = carrito.find((item) => item.id === "descuentoJuegos");

    if (totalJuegos > 30) {
      const descuento = parseFloat((totalJuegos * 0.15).toFixed(2));
      if (!yaExiste) {
        setCarrito((prev) => [
          ...prev,
          {
            id: "descuentoJuegos",
            nombre: "Descuento Juegos de Mesa",
            precio: -descuento,
            cantidad: 1,
            tipo: "descuento",
            imagen: "/imagenes/descuento.jpg",
          },
        ]);
      } else {
        setCarrito((prev) =>
          prev.map((item) =>
            item.id === "descuentoJuegos" ? { ...item, precio: -descuento } : item
          )
        );
      }
    } else if (yaExiste) {
      setCarrito((prev) => prev.filter((item) => item.id !== "descuentoJuegos"));
    }
  }, [carrito]);

  //Descuento 5% por código
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
            id: "descuento5",
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
            item.nombre === "Descuento 5%" ? { ...item, precio: -descuento } : item
          )
        );
      }
    }
  }, [carrito, descuentoAplicado]);

  return (
    <div
      className="offcanvas offcanvas-start"
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
            document.getElementById("offcanvasCarrito")?.classList.remove("show")
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

                {producto.tipo !== "descuento" ? (
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

              {producto.tipo !== "descuento" && (
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

        <input
          type="text"
          placeholder="Código de descuento"
          value={codigoDescuento}
          onChange={(e) => setCodigoDescuento(e.target.value)}
        />
        <button className="btn btn-success btn-sm mt-2" onClick={aplicarCodigoDescuento}>
          Aplicar Código
        </button>
      </div>
    </div>
  );
};

export default Carrito;
