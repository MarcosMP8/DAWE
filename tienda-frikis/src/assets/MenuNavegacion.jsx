import React from "react";

const MenuNavegacion = () => {
  return (
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li id="mostrarBotonCarrito">
          <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            Carrito
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavegacion;