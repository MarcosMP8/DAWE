import React from "react";

const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="paginacion-nav my-3">
      <ul className="pagination justify-content-center">
        {/* Botón Anterior (solo se muestra si no estamos en la primera página) */}
        {paginaActual > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => cambiarPagina(paginaActual - 1)}
            >
              Anterior
            </button>
          </li>
        )}

        {/* Botones de páginas */}
        {paginas.map((numero) => (
          <li
            key={numero}
            className={`page-item ${paginaActual === numero ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => cambiarPagina(numero)}
              style={
                paginaActual === numero
                  ? {
                      backgroundColor: "#0d6efd",
                      color: "white",
                      borderColor: "#0d6efd",
                    }
                  : {}
              }
            >
              {numero}
            </button>
          </li>
        ))}

        {/* Botón Siguiente (solo se muestra si no estamos en la última página) */}
        {paginaActual < totalPaginas && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => cambiarPagina(paginaActual + 1)}
            >
              Siguiente
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginacion;
