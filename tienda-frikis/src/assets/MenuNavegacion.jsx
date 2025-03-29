import React from "react";
import "./estilos.css";
import carritoImg from "../imagenes/carrito.png";

const MenuNavegacion = ({ estaOffline }) => {
  return (
    <nav className="menu-nav d-flex justify-content-between align-items-center px-4 py-2">
      <ul className="d-flex list-unstyled mb-0">
        <li className="me-3"><a href="#" className="text-white fw-bold">Inicio</a></li>
        <li>
          <button className="btn btn-primary"
          onClick={() =>
            document.getElementById("offcanvasCarrito")?.classList.add("show")
          }
          >
            <img src={carritoImg} alt="Carrito" width="24" height="24" className="me-2" />
            Carrito
          </button>
        </li>
      </ul>

      {estaOffline && (
        <div className="offline-alert">
          Estás offline
        </div>
      )}
    </nav>
  );
};

export default MenuNavegacion;