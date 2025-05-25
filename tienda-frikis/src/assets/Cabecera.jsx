import React from "react";
import MenuNavegacion from "./MenuNavegacion.jsx";

const Cabecera = ({
  estaOffline,
  usuario,
  onMostrarFormulario,
  onInicio,
  onMostrarMiCuenta,
  onEditarProductos
}) => {
  return (
    <header>
      <h1>~ LA TIENDA DE FRIKIS ~</h1>
      <MenuNavegacion
        estaOffline={estaOffline}
        usuario={usuario}
        onMostrarFormulario={onMostrarFormulario}
        onInicio={onInicio}
        onMostrarMiCuenta={onMostrarMiCuenta}
        onEditarProductos={onEditarProductos}
      />
    </header>
  );
};

export default Cabecera;
