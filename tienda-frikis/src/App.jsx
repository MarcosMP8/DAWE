import React, { useState, useEffect } from "react";
import Cabecera from "./assets/Cabecera.jsx";
import BuscadorProductos from "./assets/BuscadorProductos.jsx";
import EscaparateProductos from "./assets/EscaparateProductos.jsx";
import Paginacion from "./assets/Paginacion.jsx";
import Carrito from "./assets/Carrito.jsx";
import FormularioNuevosProductos from "./assets/FormularioNuevosProductos.jsx";
import Pie from "./assets/Pie.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/estilos.css";
import MenuNavegacion from "./assets/MenuNavegacion.jsx";


const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const productosEjemplo = [
  // Videojuegos
  { id: 1, nombre: "Super Mario World", precio: 14.99, descripcion: "La primera aventura de Mario y Luigi para Super NES los condujo a un mundo de nuevos personajes, habilidades y mucho más, convirtiéndolo en uno de los videojuegos de mayor éxito de todos los tiempos. En esta entrega, los hermanos fontaneros se dirigen a la Tierra de los dinosaurios, donde conocen a Yoshi (su nuevo y adorable compañero) y luchan contra Bowser y sus secuaces a lo largo de difíciles niveles cargados de secretos. Además de montar sobre Yoshi y tragar enemigos, podrás volar a lo más alto gracias a la Capa de Pluma.", imagen: "/imagenes/Videojuegos/super_mario_world.webp" },
  { id: 2, nombre: "The Legend of Zelda: A Link to the Past", precio: 9.99, descripcion: "Aventura épica en Hyrule.", imagen: "/imagenes/Videojuegos/legendOfZelda.jpg" },
  { id: 3, nombre: "Street Fighter II", precio: 7.99, descripcion: "Juego de lucha clásico de Capcom.", imagen: "/imagenes/Videojuegos/streetFighter2.jpg" },
  { id: 4, nombre: "Grand Theft Auto V", precio: 19.99, descripcion: "Un mundo abierto de crimen y acción.", imagen: "/imagenes/Videojuegos/GTAV.jpg" },
  { id: 5, nombre: "Mario Kart 8 Deluxe", precio: 39.99, descripcion: "Compite en carreras locas con Mario y sus amigos.", imagen: "/imagenes/Videojuegos/MK8.jpg" },
  { id: 6, nombre: "Dragon Ball Sparking! ZERO", precio: 69.99, descripcion: "Juego de lucha basado en Dragon Ball Z.", imagen: "/imagenes/Videojuegos/DBSZ.jpg" },

  // Libros
  { id: 7, nombre: "Final Fantasy: Level 99", precio: 24.99, descripcion: "Explora las criaturas icónicas de Final Fantasy.", imagen: "/imagenes/Libros/FF99.jpg" },
  { id: 8, nombre: "Cómo se hizo Assassin's Creed", precio: 32.99, descripcion: "Historia y arte del juego de Ubisoft.", imagen: "/imagenes/Libros/AC15.jpg" },
  { id: 9, nombre: "Batman: un héroe de videojuego", precio: 11.99, descripcion: "Historia de Batman en los videojuegos.", imagen: "/imagenes/Libros/Batman.jpg" },
  { id: 10, nombre: "Harry Potter y la piedra filosofal", precio: 16.10, descripcion: "El inicio de la saga de Harry Potter.", imagen: "/imagenes/Libros/HP_piedra_filosofal.jpg" },
  { id: 11, nombre: "El Hobbit", precio: 15.20, descripcion: "La aventura de Bilbo Bolsón en la Tierra Media.", imagen: "/imagenes/Libros/el_Hobbit.jpg" },

  // Merchandising
  { id: 12, nombre: "Funko Pop Harry Potter Gryffindor", precio: 16.99, descripcion: "Figura coleccionable de Harry Potter.", imagen: "/imagenes/Merchandising/HP.jpg" },
  { id: 13, nombre: "Camiseta Star Wars Logo Azul", precio: 11.99, descripcion: "Camiseta oficial de Star Wars.", imagen: "/imagenes/Merchandising/SW.jpg" },
  { id: 14, nombre: "Funko Pop Goku", precio: 18.99, descripcion: "Figura de Goku de Dragon Ball Z.", imagen: "/imagenes/Merchandising/goku.jpg" },
  { id: 15, nombre: "Taza Pokémon Gotta Catch 'em All", precio: 14.99, descripcion: "Taza termocromática de Pokémon.", imagen: "/imagenes/Merchandising/PKMNTaza.jpg" },
  { id: 16, nombre: "Bolsa Minecraft Lenticular", precio: 12.99, descripcion: "Bolsa con efecto lenticular de Minecraft.", imagen: "/imagenes/Merchandising/minecraft.jpg" },

  // Puzzles
  { id: 17, nombre: "Fallout Puzzle 1000 piezas", precio: 21.99, descripcion: "Puzzle de colección de Fallout.", imagen: "/imagenes/Puzzles/Fallout.jpg" },
  { id: 18, nombre: "Sonic The Hedgehog Puzzle", precio: 14.99, descripcion: "Puzzle de 500 piezas de Sonic.", imagen: "/imagenes/Puzzles/sonic.jpg" },
  { id: 19, nombre: "Pokémon 3D Puzzle Master Ball", precio: 12.99, descripcion: "Puzzle en forma de Pokéball.", imagen: "/imagenes/Puzzles/masterball.jpg" },
  { id: 20, nombre: "Puzzle 3D Bola Grogu", precio: 15.95, descripcion: "Puzzle de Grogu (Baby Yoda).", imagen: "/imagenes/Puzzles/puzzle-3d-ravensburger-bola-grogu.png" },
  { id: 21, nombre: "Puzzle Panorama Señor de los Anillos", precio: 10.95, descripcion: "Puzzle panorámico de 1000 piezas.", imagen: "/imagenes/Puzzles/puzzle-señor-de-los-anillos-1000-pzs.PNG" },

  // Juegos de Mesa
  { id: 22, nombre: "Monopoly", precio: 42.99, descripcion: "El clásico juego de compraventa de propiedades.", imagen: "/imagenes/JuegosDeMesa/monopoly.jpg" },
  { id: 23, nombre: "Trivial Pursuit", precio: 28.99, descripcion: "Juego de preguntas y respuestas.", imagen: "/imagenes/JuegosDeMesa/trivial.jpg" },
  { id: 24, nombre: "Cluedo", precio: 27.99, descripcion: "Juego de misterio e investigación.", imagen: "/imagenes/JuegosDeMesa/cluedo.jpg" },
  { id: 25, nombre: "Parchís", precio: 30.41, descripcion: "Clásico juego de mesa con hasta 8 jugadores.", imagen: "/imagenes/JuegosDeMesa/parchis.jpg" },
  { id: 26, nombre: "Estuche de Poker 300 piezas", precio: 34.86, descripcion: "Set de póker con fichas y barajas.", imagen: "/imagenes/JuegosDeMesa/poker.jpg" },
];

const App = () => {
  const [estaOffline, setEstaOffline] = useState(false);
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados && JSON.parse(productosGuardados).length > 0) {
      return JSON.parse(productosGuardados);
    } else {
      localStorage.setItem("productos", JSON.stringify(productosEjemplo));
      return productosEjemplo;
    }
  });   
  const [carrito, setCarrito] = useState(cargarCarritoDesdeLocalStorage);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    const actualizarEstadoConexion = () => {
      setEstaOffline(!navigator.onLine);
    };
  
    window.addEventListener("online", actualizarEstadoConexion);
    window.addEventListener("offline", actualizarEstadoConexion);
  
    // Establece el estado inicial al cargar
    actualizarEstadoConexion();
  
    return () => {
      window.removeEventListener("online", actualizarEstadoConexion);
      window.removeEventListener("offline", actualizarEstadoConexion);
    };
  }, []);
  

  useEffect(() => {
    console.log("Productos guardados en localStorage:", productos);
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);  

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 🔍 Filtrado de productos en base a búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔢 Calculo de paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPagina = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  // 📥 Agregar producto nuevo
  const agregarProducto = (nuevoProducto) => {
    const nuevo = { ...nuevoProducto, id: productos.length + 1 };
    const nuevosProductos = [...productos, nuevo];
    setProductos(nuevosProductos);
  };

  // 🛒 Agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // 🔁 Cambio de página
  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  // 🧼 Resetear a la página 1 cuando cambia la búsqueda
  const manejarBusqueda = (texto) => {
    setBusqueda(texto);
    setPaginaActual(1);
  };

  return (
    <div className="contenido">
      <Cabecera estaOffline={estaOffline} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <EscaparateProductos
              productos={productosPagina}
              agregarAlCarrito={agregarAlCarrito}
              busqueda={busqueda}
              setBusqueda={manejarBusqueda}
            />
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              cambiarPagina={cambiarPagina}
            />
          </div>
          <div className="col-md-4">
            <Carrito carrito={carrito} setCarrito={setCarrito} />
            <FormularioNuevosProductos agregarProducto={agregarProducto} estaOffline={estaOffline}/>
          </div>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default App;