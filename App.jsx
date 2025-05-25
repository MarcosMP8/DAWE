import React, { useState, useEffect, useCallback } from "react";
import Cabecera from "./assets/Cabecera.jsx";
import EscaparateProductos from "./assets/EscaparateProductos.jsx";
import Carrito from "./assets/Carrito.jsx";
import FormularioNuevosProductos from "./assets/FormularioNuevosProductos.jsx";
import Pie from "./assets/Pie.jsx";
import Login from "./login.jsx";
import PanelUsuario from "./assets/PanelUsuario.jsx";
import Paginacion from "./assets/Paginacion.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/estilos.css";

import { auth } from "./firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import EditarProductos from "./assets/EditarProductos.jsx";

import * as tienda from "./tienda/tienda.js";

const App = () => {
  // ——— Estados ———
  const [carrito, setCarrito] = useState(tienda.cargarCarrito());
  const [estaOffline, setEstaOffline] = useState(!navigator.onLine);
  const [busqueda, setBusqueda] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [visitas, setVisitas] = useState(0);
  const [seccionAside, setSeccionAside] = useState("login");
  const [seccionPrincipal, setSeccionPrincipal] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);

  const productosPorPagina = 6;

  // ——— Función para cargar productos ———
  const fetchProductos = useCallback(() => {
  const params = new URLSearchParams();

  if (busqueda.trim()) {
    params.append("search", busqueda.trim());
  } else {
    params.append("page", paginaActual);
    params.append("limit", productosPorPagina);
  }

  fetch(`http://localhost:4000/api/productos?${params.toString()}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      setProductos(Array.isArray(data.productos) ? data.productos : []);
      setTotalProductos(data.total ?? 0);
      setTotalPaginas(
        busqueda.trim()
          ? 1 // si estamos buscando, todo en una página
          : Math.ceil((data.total ?? 0) / productosPorPagina)
      );
    })
    .catch(console.error);
}, [paginaActual, productosPorPagina, busqueda]);




  // ——— Inicial y cada vez que cambie página ———
  useEffect(() => {
    fetchProductos(busqueda);
  }, [fetchProductos, busqueda]);

  // ——— Inicializar carrito desde localStorage ———
  useEffect(() => {
    setCarrito(tienda.cargarCarrito());
  }, []);

  // ——— Observador online/offline ———
  useEffect(() => {
    const actualizar = () => setEstaOffline(!navigator.onLine);
    window.addEventListener("online", actualizar);
    window.addEventListener("offline", actualizar);
    return () => {
      window.removeEventListener("online", actualizar);
      window.removeEventListener("offline", actualizar);
    };
  }, []);

  // ——— Observador de sesión Firebase ———
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch("http://localhost:4000/api/usuarios/me", { credentials: "include" })
          .then((r) => r.json())
          .then((data) => {
            if (data.usuario) {
              setUsuario(data.usuario);
              setVisitas(data.visitas);
              setSeccionAside("panel");
            }
          });
      } else {
        setUsuario(null);
        setVisitas(0);
        setSeccionAside("login");
      }
    });
  }, []);

  // ——— Handlers ———
  const handleInicio = () => {
    setSeccionPrincipal("productos");
    setSeccionAside(usuario ? "panel" : "login");
    fetchProductos();
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    await fetch("http://localhost:4000/api/usuarios/logout", {
      method: "POST",
      credentials: "include",
    });
    setUsuario(null);
    setVisitas(0);
    setSeccionAside("login");
    setSeccionPrincipal("productos");
    setCarrito([]);
    localStorage.removeItem("mi-carrito");
  };

  const agregarProducto = async (nuevo) => {
    try {
      const res = await fetch("http://localhost:4000/api/productos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: nuevo.tipo,
          nombre: nuevo.nombre,
          precio: nuevo.precio,
          descripcion: nuevo.descripcion,
          extra: nuevo.infoExtra ?? nuevo.extra,
          imagen: nuevo.imagen,
        }),
      });
      if (!res.ok) throw await res.json();
      alert("✅ Producto subido con éxito.");
      fetchProductos();
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo crear el producto.");
    }
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === producto._id);
      let actualizado;
      if (existe) {
        actualizado = prev.map((i) =>
          i.id === producto._id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
        tienda.guardarEnCarrito(actualizado.find((i) => i.id === producto._id), actualizado.find((i) => i.id === producto._id).cantidad);
      } else {
        const nuevoItem = {
          id: producto._id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1,
          tipo: producto.tipo,
        };
        tienda.guardarEnCarrito(nuevoItem, 1);
        actualizado = [...prev, nuevoItem];
      }
      return actualizado;
    });
  };

  const manejarBusqueda = (texto) => {
    setBusqueda(texto);
    setPaginaActual(1); // Reinicia a la primera página una vez se deje de buscar
    
  };


  // ——— Render ———
  return (
    <div className="contenido">
      <Cabecera
        estaOffline={estaOffline}
        usuario={usuario}
        onMostrarFormulario={() => {
          setSeccionAside("formProducto");
          setSeccionPrincipal("productos");
        }}
        onInicio={handleInicio}
        onMostrarMiCuenta={() => {
          setSeccionAside("panel");
          setSeccionPrincipal("cuenta");
        }}
        onEditarProductos={() => {
          setSeccionAside("panel");
          setSeccionPrincipal("editarProductos");
        }}
      />
      <div className="promo-banner">
        <p>¡Descuento especial: -15% en Juegos de Mesa si superas 30€!</p>
      </div>

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            {seccionPrincipal === "productos" ? (
              <>
                <EscaparateProductos
                  productos={productos}
                  agregarAlCarrito={agregarAlCarrito}
                  busqueda={busqueda}
                  setBusqueda={manejarBusqueda}
                />
                {!busqueda.trim() && (
                  <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    productosPorPagina={productosPorPagina}
                    totalProductos={totalProductos}
                    cambiarPagina={setPaginaActual}
                  />
                )}

              </>
            ) : seccionPrincipal === "editarProductos" ? (
              <EditarProductos estaOffline={estaOffline} />
            ) : (
              <div className="border rounded p-4 bg-white shadow-sm">
                <h3>🧾 Detalles de la cuenta</h3>
                {estaOffline && (
                  <div className="alert alert-warning text-center mt-2" role="alert">
                    ⚠️ Estás desconectado. No puedes editar los datos ahora.
                  </div>
                )}
                <form>
                  <fieldset disabled={estaOffline}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={usuario?.nombre || ""}
                        onChange={(e) => setUsuario((u) => ({ ...u, nombre: e.target.value }))}
                      />
                    </div>
                    <p><strong>Email:</strong> {usuario?.email}</p>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Teléfono:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={usuario?.telefono || ""}
                        onChange={(e) => setUsuario((u) => ({ ...u, telefono: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Dirección:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={usuario?.direccion || ""}
                        onChange={(e) => setUsuario((u) => ({ ...u, direccion: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Edad:</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={usuario?.edad || ""}
                        onChange={(e) => setUsuario((u) => ({ ...u, edad: e.target.value }))}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={async () => {
                        if (!usuario.nombre.trim()) {
                          return alert("❌ El nombre no puede estar vacío.");
                        }
                        try {
                          const res = await fetch("http://localhost:4000/api/usuarios/me", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify(usuario),
                          });
                          const data = await res.json();
                          if (res.ok) alert("✅ Datos actualizados");
                          else alert("❌ " + data.error);
                        } catch {
                          alert("❌ Error al conectar");
                        }
                      }}
                    >
                      Guardar cambios
                    </button>
                  </fieldset>
                </form>
              </div>
            )}
          </div>

          <div className="col-md-4">
            <Carrito carrito={carrito} setCarrito={setCarrito} />
            {seccionAside === "login" ? (
              <Login
                estaOffline={estaOffline}
                onLoginExitoso={(u, v) => {
                  setUsuario(u);
                  setVisitas(v);
                  setSeccionAside("panel");
                  // ⇣⇣ Al loguear, vaciamos el carrito antiguo ⇣⇣
                  setCarrito([]);
                  localStorage.removeItem("mi-carrito");
                }}
              />
            ) : seccionAside === "formProducto" && usuario?.rol === "admin" ? (
              <FormularioNuevosProductos agregarProducto={agregarProducto} estaOffline={estaOffline} />
            ) : (
              <PanelUsuario usuario={usuario} visitas={visitas} onLogout={cerrarSesion} estaOffline={estaOffline} />
            )}
          </div>
        </div>
      </div>

      <Pie />
    </div>
  );
};

export default App;
