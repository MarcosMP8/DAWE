import React from "react";
import MenuNavegacion from "./MenuNavegacion.jsx";


const Cabecera = ({ estaOffline }) => {
  return (
    <header>
      <h1>~ LA TIENDA DE FRIKIS ~</h1>
      <MenuNavegacion estaOffline={estaOffline} />
    </header>
  );
};
export default Cabecera;