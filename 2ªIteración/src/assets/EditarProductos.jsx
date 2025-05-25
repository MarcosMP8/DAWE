import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./../assets/estilos.css";

const fileTypes = ["JPG", "PNG", "GIF"];
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const EditarProductos = ({ estaOffline }) => {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [editando, setEditando] = useState(null);
  const [formValues, setFormValues] = useState({});

  // Carga inicial
  useEffect(() => {
    fetch(`${API}/api/productos?page=1&limit=1000`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProductos(data.productos || []))
      .catch(console.error);
  }, []);

  // Toggle checkbox
  const toggleSeleccion = (id) =>
    setSeleccionados((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });

  // Borrar seleccionados
  const borrarSeleccionados = () => {
    if (!seleccionados.size || estaOffline) return;
    if (!window.confirm(`¿Borrar ${seleccionados.size} producto(s)?`)) return;
    fetch(`${API}/api/productos`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(seleccionados) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        setProductos((prev) =>
          prev.filter((p) => !seleccionados.has(p._id))
        );
        setSeleccionados(new Set());
      })
      .catch((err) => alert("Error borrando: " + err.message));
  };

  // Arrancar edición
  const editar = (p) => {
    setEditando(p._id);               // ← corregido aquí
    setFormValues({
      tipo: p.tipo,
      nombre: p.nombre,
      precio: p.precio,
      descripcion: p.descripcion,
      extra: p.extra,
      imagen: p.imagen,
    });
  };

  // Carga base64 de la nueva imagen
  const manejarImagen = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
      setFormValues((f) => ({ ...f, imagen: reader.result }));
  };

  // Guardar cambios
  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/productos/${editando}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) throw new Error(await res.text());
      const actualizado = await res.json();
      setProductos((prev) =>
        prev.map((p) => (p._id === editando ? actualizado : p))
      );
      setEditando(null);
    } catch (err) {
      alert("Error guardando: " + err.message);
    }
  };

  return (
    <div>
      <button
        className="btn btn-secondary mb-3 btn-sm"
        onClick={borrarSeleccionados}
        disabled={estaOffline || seleccionados.size === 0}
      >
        Borrar todos los seleccionados
      </button>

      <ul className="list-group">
        {productos.map((p) => (
          <li
            key={p._id}
            className="list-group-item d-flex align-items-center py-1"
          >
            <input
              type="checkbox"
              className="me-2 form-check-input"
              checked={seleccionados.has(p._id)}
              onChange={() => toggleSeleccion(p._id)}
              disabled={estaOffline}
            />

            <img src={p.imagen} alt="" className="thumbnail me-2" />

            <span className="flex-fill text-truncate">{p.nombre}</span>

            {editando === p._id ? (
              <button
                className="btn btn-link btn-sm ms-2"
                onClick={() => setEditando(null)}
              >
                Cerrar
              </button>
            ) : (
              <button
                className="btn btn-link btn-sm ms-2"
                onClick={() => editar(p)}
                disabled={estaOffline}
              >
                Editar
              </button>
            )}

            {editando === p._id && (
              <>
                {/* Desplegable justo debajo */}
                <div className="w-100 mt-2">
                  <select
                    className="form-select form-select-sm"
                    value={formValues.tipo}
                  >
                    <option value="T1">Videojuego</option>
                    <option value="T2">Libro</option>
                    <option value="T3">Merchandising</option>
                    <option value="T4">Puzzle</option>
                    <option value="T5">Juego de Mesa</option>
                  </select>
                </div>

                {/* Formulario principal */}
                <div className="w-100 mt-1 border p-3 bg-light">
                  <form onSubmit={guardarCambios}>
                    {/* Nombre */}
                    <div className="mb-2">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formValues.nombre}
                        onChange={(e) =>
                          setFormValues((f) => ({
                            ...f,
                            nombre: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Precio + Extra */}
                    <div className="row g-2">
                      <div className="col">
                        <label className="form-label">Precio</label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          className="form-control form-control-sm"
                          value={formValues.precio}
                          onChange={(e) =>
                            setFormValues((f) => ({
                              ...f,
                              precio: parseInt(e.target.value, 10),
                            }))
                          }
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">
                          {p.tipo === "T4"
                            ? "Número de piezas"
                            : p.tipo === "T5"
                            ? "Número de jugadores"
                            : "Campo extra"}
                        </label>
                        <input
                          type={
                            p.tipo === "T4" || p.tipo === "T5"
                              ? "number"
                              : "text"
                          }
                          min={
                            p.tipo === "T4" || p.tipo === "T5"
                              ? "0"
                              : undefined
                          }
                          className="form-control form-control-sm"
                          value={formValues.extra}
                          onChange={(e) =>
                            setFormValues((f) => ({
                              ...f,
                              extra:
                                p.tipo === "T4" || p.tipo === "T5"
                                  ? parseInt(e.target.value, 10)
                                  : e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-2 mt-2">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        value={formValues.descripcion}
                        onChange={(e) =>
                          setFormValues((f) => ({
                            ...f,
                            descripcion: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Drag & drop de imagen */}
                    <div className="mb-2">
                      <FileUploader
                        handleChange={manejarImagen}
                        name="file"
                        types={fileTypes}
                        classes="file-uploader"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-sm mt-2"
                      disabled={estaOffline}
                    >
                      Guardar cambios
                    </button>
                  </form>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditarProductos;
