import React from "react";
import carritoImg from "../imagenes/carrito.png";
import "./estilos.css";

const MenuNavegacion = ({
  estaOffline,
  usuario,
  onMostrarFormulario,
  onInicio,
  onMostrarMiCuenta,
  onEditarProductos
}) => {
  const esAdmin = usuario?.rol === "admin";

  return (
    <nav className="menu-nav d-flex justify-content-between align-items-center px-4 py-2">
      <ul className="d-flex list-unstyled mb-0">
        <li className="me-3">
          <button className="enlace-menu" onClick={onInicio}>
            Inicio
          </button>
        </li>
        <li className="me-3">
          <button
            className="enlace-menu"
            onClick={() => document.getElementById("offcanvasCarrito")?.classList.add("show")}
          >
            <img
              src={carritoImg}
              alt="Carrito"
              width="20"
              height="20"
              className="me-2"
            />
            Carrito
          </button>
        </li>

        {usuario && (
          <>
            <li className="me-3">
              <button className="enlace-menu" onClick={onMostrarMiCuenta}>
                Mi cuenta
              </button>
            </li>
            {esAdmin && (
              <>
                <li className="me-3">
                  <button className="enlace-menu" onClick={onMostrarFormulario}>
                    ➕ Agregar Producto
                  </button>
                </li>
                <li>
                  <button
                    className="enlace-menu"
                    onClick={onEditarProductos}
                  >
                    ✏️ Editar/Borrar producto
                  </button>
                </li>
              </>
            )}
          </>
        )}
      </ul>

      {estaOffline && (
        <div className="offline-alert text-white fw-bold">
          ⚠️ Estás offline
        </div>
      )}
    </nav>
  );
};

export default MenuNavegacion;
