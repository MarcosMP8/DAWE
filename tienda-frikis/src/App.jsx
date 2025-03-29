import React, { useState, useEffect } from "react";
import Cabecera from "./assets/Cabecera.jsx";
import BuscadorProductos from "./assets/BuscadorProductos.jsx";
import EscaparateProductos from "./assets/EscaparateProductos.jsx";
import Paginacion from "./assets/Paginacion.jsx";
import Carrito from "./assets/Carrito.jsx";
import FormularioNuevosProductos from "./assets/FormularioNuevosProductos.jsx";
import Pie from "./assets/Pie.jsx";
import MenuNavegacion from "./assets/MenuNavegacion.jsx";
import { productosEjemplo, inicializarProductos } from "./tienda/tienda.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/estilos.css";

const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const App = () => {
  const [estaOffline, setEstaOffline] = useState(false);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(cargarCarritoDesdeLocalStorage);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    inicializarProductos();
    const guardados = localStorage.getItem("productos");
    if (guardados) {
      setProductos(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    const actualizarEstadoConexion = () => {
      setEstaOffline(!navigator.onLine);
    };

    window.addEventListener("online", actualizarEstadoConexion);
    window.addEventListener("offline", actualizarEstadoConexion);
    actualizarEstadoConexion();

    return () => {
      window.removeEventListener("online", actualizarEstadoConexion);
      window.removeEventListener("offline", actualizarEstadoConexion);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPagina = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const agregarProducto = (nuevoProducto) => {
    const nuevo = { ...nuevoProducto, id: productos.length + 1 };
    const nuevosProductos = [...productos, nuevo];
    setProductos(nuevosProductos);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const manejarBusqueda = (texto) => {
    setBusqueda(texto);
    setPaginaActual(1);
  };

  return (
    <div className="contenido">
      <Cabecera estaOffline={estaOffline} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <EscaparateProductos
              productos={productosPagina}
              agregarAlCarrito={agregarAlCarrito}
              busqueda={busqueda}
              setBusqueda={manejarBusqueda}
            />
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              cambiarPagina={cambiarPagina}
            />
          </div>
          <div className="col-md-4">
            <Carrito carrito={carrito} setCarrito={setCarrito} />
            <FormularioNuevosProductos agregarProducto={agregarProducto} estaOffline={estaOffline} />
          </div>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default App;
