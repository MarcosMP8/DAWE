import React from "react";

const MenuNavegacion = () => {
  return (
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li id="mostrarBotonCarrito">
          <button className="btn btn-primary" onClick={() => document.getElementById("offcanvasCarrito").classList.add("show")}>
            🛒 Carrito
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavegacion;