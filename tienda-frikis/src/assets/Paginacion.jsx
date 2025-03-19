import React from "react";

const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <nav className="paginacion-nav">
      <ul className="pagination pagination-sm justify-content-center">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <li key={i} className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacion;