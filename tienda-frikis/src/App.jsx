import React, { useState, useEffect } from "react";
import Cabecera from "./assets/Cabecera.jsx";
import BuscadorProductos from "./assets/BuscadorProductos.jsx";
import EscaparateProductos from "./assets/EscaparateProductos.jsx";
import Paginacion from "./assets/Paginacion.jsx";
import Carrito from "./assets/Carrito.jsx";
import FormularioNuevosProductos from "./assets/FormularioNuevosProductos.jsx";
import Pie from "./assets/Pie.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/estilos.css";

const cargarProductosDesdeLocalStorage = () => {
  const productosGuardados = localStorage.getItem("productos");
  return productosGuardados ? JSON.parse(productosGuardados) : [];
};

const App = () => {
  const [productos, setProductos] = useState(cargarProductosDesdeLocalStorage);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const filtrarProductos = (texto) => {
    setBusqueda(texto);
    const productosFiltrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setProductos(productosFiltrados);
  };

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { ...nuevoProducto, id: productos.length + 1 }]);
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const productosPagina = productos.slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina);

  return (
    <div className="contenido">
      <Cabecera />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <BuscadorProductos onBuscar={filtrarProductos} />
            <EscaparateProductos productos={productosPagina} />
            <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} cambiarPagina={cambiarPagina} />
          </div>
          <div className="col-md-4">
            <Carrito carrito={[]} />
            <FormularioNuevosProductos agregarProducto={agregarProducto} />
          </div>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default App;