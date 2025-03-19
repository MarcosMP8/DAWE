import React, { useState } from "react";

const BuscadorProductos = ({ onBuscar }) => {
  const [busqueda, setBusqueda] = useState("");

  const manejarCambio = (evento) => {
    const texto = evento.target.value;
    setBusqueda(texto);
    onBuscar(texto); // Llama a la función que filtra los productos
  };

  return (
    <div id="infoMain">
      <h2 id="titulo">Todos los productos</h2>
      <input
        type="text"
        id="search-bar"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={manejarCambio}
      />
    </div>
  );
};

export default BuscadorProductos;