import React from "react";

const PanelUsuario = ({ usuario, visitas, onLogout, estaOffline }) => {
  if (!usuario) return null;

  return (
    <div className="border p-3 rounded bg-white shadow">
      <div className="bg-secondary text-white text-center fw-bold py-2 mb-3 rounded">
        Bienvenide, {usuario.nombre}
      </div>

      <div className="border rounded p-2 mb-3">
        {usuario.rol && (
          <p className="mb-1">
            <strong>Rol:</strong> {usuario.rol === "admin" ? "Administrador" : usuario.rol}
          </p>
        )}
        <p className="mb-0">
          <strong>Número de visitas:</strong> {visitas}
        </p>
      </div>

      {estaOffline && (
        <div className="alert alert-danger text-center mt-2" role="alert">
          ⚠️ Estás sin conexión. No puedes cerrar sesión.
        </div>
      )}

      <button
        className="btn btn-secondary w-100 fw-bold"
        onClick={onLogout}
        disabled={estaOffline}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default PanelUsuario;
