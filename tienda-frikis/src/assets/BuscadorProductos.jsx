import React from "react";

const BuscadorProductos = ({ busqueda, onBuscar }) => {
  const manejarCambio = (evento) => {
    const texto = evento.target.value;
    onBuscar(texto);
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
