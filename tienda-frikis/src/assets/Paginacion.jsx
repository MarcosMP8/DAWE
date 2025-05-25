import React from "react";

const Paginacion = ({ paginaActual, totalPaginas, productosPorPagina, totalProductos, cambiarPagina }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  const mostradosHastaAhora = Math.min(paginaActual * productosPorPagina, totalProductos);


  return (
    <nav className="paginacion-nav my-3">
      <p className="text-center text-muted mb-2">
        Mostrando {mostradosHastaAhora} de {totalProductos} productos.
      </p>


      <ul className="pagination justify-content-center">
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
