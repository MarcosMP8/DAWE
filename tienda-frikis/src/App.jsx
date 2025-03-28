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
  { id: 2, nombre: "The Legend of Zelda: A Link to the Past", precio: 9.99, descripcion: "En esta gran aventura, Link recibe por telepatía un mensaje de Zelda, que le pide ayuda. Debe encontrar la Master Sword y viajar al Dark World para derrotar a Ganon y devolver la paz a la tierra de Hyrule.", imagen: "/imagenes/Videojuegos/legendOfZelda.jpg" },
  { id: 3, nombre: "Street Fighter II", precio: 7.99, descripcion: "Street Fighter II es un juego de lucha uno contra uno desarrollado por Capcom. Publicado originalmente en 1991 para Arcade, revolucionó el género y lo acercó al público general. Podías seleccionar ocho personajes diferentes, cada uno con su propio conjunto de movimientos, fortalezas y debilidades.", imagen: "/imagenes/Videojuegos/streetFighter2.jpg" },
  { id: 4, nombre: "Grand Theft Auto V", precio: 19.99, descripcion: "Un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor y más desquiciado del mundo criminal, del gobierno de los EE. UU. y de la industria del espectáculo, y tendrán que llevar a cabo una serie de peligrosos golpes para sobrevivir en una ciudad implacable en la que no pueden confiar en nadie. Y mucho menos los unos en los otros.", imagen: "/imagenes/Videojuegos/GTAV.jpg" },
  { id: 5, nombre: "Mario Kart 8 Deluxe", precio: 39.99, descripcion: "Compite por tierra, mar y aire, e incluso por techos y paredes, en 48 niveles. Todos los circuitos (¡y personajes!) de Mario Kart 8 para Wii U vuelven en Mario Kart 8 Deluxe, incluido circuitos descargables anteriores inspirados en Animal Crossing, Excitebike, The Legend of Zelda y muchos más.", imagen: "/imagenes/Videojuegos/MK8.jpg" },
  { id: 6, nombre: "Dragon Ball Sparking! ZERO", precio: 69.99, descripcion: "DRAGON BALL: Sparking! ZERO lleva a un nuevo nivel el legendario estilo de juego de la serie Budokai Tenkaichi. Aprende a dominar a diversos personajes jugables, cada uno con sus habilidades, transformaciones y técnicas propias. Libera tu espíritu de lucha y pelea en escenarios que se derrumban y reaccionan a tu poder a medida que el combate se recrudece.", imagen: "/imagenes/Videojuegos/DBSZ.jpg" },

  // Libros
  { id: 7, nombre: "Final Fantasy: Level 99", precio: 24.99, descripcion: "Final Fantasy: Level 99 es un bestiario que explora la diversidad de criaturas icónicas de la legendaria saga de videojuegos de Square Enix, desde sus inspiraciones en mitología clásica hasta referencias en la cultura pop y la ciencia-ficción. El libro, coescrito por Miguel Martínez Suárez y Néstor Rubio Blázquez, presenta 99 fascinantes monstruos que han desafiado a los jugadores a lo largo de los años. Desde encuentros comunes hasta batallas épicas, cada página revela la historia única y la inspiración detrás de estas criaturas. Presentado en formato álbum, Final Fantasy: Level 99 estará disponible a finales de mayo, ofreciendo a los fans la oportunidad de sumergirse en el vasto y fascinante mundo de Final Fantasy de una forma amena y diferente.", imagen: "/imagenes/Libros/FF99.jpg" },
  { id: 8, nombre: "Cómo se hizo Assassin's Creed", precio: 32.99, descripcion: "En conmemoración al 15º aniversario de Assassin's Creed se ha llevado a cabo un análisis exhaustivo de la creación de la galardonada franquicia, con magníficas ilustraciones de más de una década y media de desarrollo y entrevistas detalladas con los creadores de los juegos.", imagen: "/imagenes/Libros/AC15.jpg" },
  { id: 9, nombre: "Batman: un héroe de videojuego", precio: 11.99, descripcion: "Conocíamos su historia en el cómic, el cine o la televisión, pero nunca antes se había repasado la trayectoria del Caballero Oscuro en el mundo del videojuego, un medio con enorme potencial creativo y que se ha erigido como uno de los mayores fenómenos culturales del siglo XXI. Batman: Un héroe de videojuego supone un recorrido por más de tres décadas de incursiones del personaje en el terreno del ocio electrónico: desde su primer título, creado en 1986 por Jon Ritman, hasta el culmen alcanzado por la saga Arkham, desarrollada por el estudio Rocksteady, sin olvidar otras apariciones en todo tipo de aventuras. La obra ahonda también en la historia del personaje, desde sus orígenes, profundizando en el perfil psicológico de Batman y del resto de habitantes del universo que habita este carismático superhéroe. La psicología y la política, temáticas con una fuerte presencia siempre en las andanzas de Batman, también tienen cabida en esta obra. Un libro imprescindible para todos los amantes del Caballero Oscuro, con declaraciones exclusivas de Jon Ritman y prologado por Claudio Serrano, la voz de Batman.", imagen: "/imagenes/Libros/Batman.jpg" },
  { id: 10, nombre: "Harry Potter y la piedra filosofal", precio: 16.10, descripcion: "Harry Potter y la piedra filosofal es el primer libro de la saga Harry Potter, que catapultó a J.K. Rowling al estrellato mundial. La historia comienza con Harry, un niño huérfano que vive con sus crueles tías y tíos. En su undécimo cumpleaños, descubre que es un mago y ha sido aceptado en la escuela de magia más prestigiosa de Inglaterra: Hogwarts. Aquí, conocerá a sus futuros amigos, Ron Weasley y Hermione Granger, con quienes vivirá innumerables aventuras. En su primer año, Harry descubre que es famoso en el mundo mágico debido a un oscuro suceso ocurrido cuando era un bebé: sobrevivió a un intento de asesinato por parte de Lord Voldemort, el mago más temido. A lo largo del libro, Harry y sus amigos investigan la leyenda de la Piedra Filosofal, un objeto mágico que otorga la inmortalidad, y tratan de evitar que caiga en manos equivocadas. Durante la trama, Harry enfrenta desafíos, enemigos y revela secretos sobre su pasado. Con cada capítulo, el lector se adentra más en un mundo rico en magia, criaturas fantásticas y personajes entrañables. Harry Potter y la piedra filosofal es una obra que combina magia, aventura, amistad y valentía. Su tono y su narración equilibran la inocencia de la niñez con la profundidad de los conflictos morales, haciendo que tanto jóvenes como adultos se enganchen a la trama. La saga de Harry Potter se ha convertido en un fenómeno cultural global, con millones de fans alrededor del mundo y una serie de películas que amplían el universo literario. Este primer libro es solo el inicio de una historia que aborda la lucha entre el bien y el mal, el sacrificio y el poder de la amistad.", imagen: "/imagenes/Libros/HP_piedra_filosofal.jpg" },
  { id: 11, nombre: "El Hobbit", precio: 15.20, descripcion: "El Hobbit es la obra maestra de J.R.R. Tolkien que, aunque inicialmente fue escrita para un público juvenil, se ha ganado el reconocimiento de lectores de todas las edades. Publicado en 1937, este libro marca el comienzo de la vasta y detallada mitología de la Tierra Media, que más tarde se expandiría con El Señor de los Anillos. La historia sigue a Bilbo Bolsón, un hobbit que disfruta de una vida tranquila y simple en su agujero en la Comarca. Su vida da un giro inesperado cuando es reclutado por el mago Gandalf y un grupo de enanos para embarcarse en una peligrosa aventura: recuperar el tesoro robado por el dragón Smaug, quien se apoderó de la Montaña Solitaria. Aunque inicialmente reacio, Bilbo se embarca en esta travesía que lo llevará a través de bosques oscuros, montañas nevadas y batallas épicas. A lo largo del viaje, Bilbo se encuentra con seres mágicos como trolls, elfo, orcos, y, sobre todo, Gollum, un ser extraño y misterioso con el que mantiene un inolvidable enfrentamiento. La obra está cargada de elementos de fantasía y aventura clásica: monstruos, magia, viajes épicos, y dilemas personales. Bilbo, un personaje común y corriente, se convierte en un héroe inesperado, y su crecimiento y valentía durante el viaje son los puntos clave de la trama. Su encuentro con el Anillo Único, que más tarde jugaría un papel crucial en El Señor de los Anillos, es uno de los giros más importantes de la historia. El Hobbit no solo es una narración de aventuras, sino también una reflexión sobre el coraje, la amistad, la lealtad y la lucha contra la avaricia y la oscuridad. El estilo narrativo de Tolkien es rico en detalles y descripciones del mundo natural, creando una sensación de inmersión en un lugar mágico. Esta obra es el preludio de la compleja y majestuosa saga de El Señor de los Anillos, pero se mantiene independiente en su tono y narrativa. A lo largo de las décadas, El Hobbit ha capturado la imaginación de millones de lectores y se ha adaptado a varias películas, siendo la más reciente una trilogía dirigida por Peter Jackson. A pesar de su enfoque más ligero y accesible que su secuela, El Hobbit es una obra profunda, esencial para entender la rica mitología de la Tierra Media.", imagen: "/imagenes/Libros/el_Hobbit.jpg" },

  // Merchandising
  { id: 12, nombre: "Funko Pop Harry Potter Gryffindor", precio: 16.99, descripcion: "Este muñeco Pop tiene el nº 01 de su colección de Harry Potter, su nombre original es Funko Pop Vinyl Harry Potter Gryffindor de la licencia Harry Potter.", imagen: "/imagenes/Merchandising/HP.jpg" },
  { id: 13, nombre: "Camiseta Star Wars Logo Azul", precio: 11.99, descripcion: "Nueva camiseta con el logo de la saga, esta vez en versión retro y con fondo en azul. Y para completar la estética ochentera, se presenta en una llamativa caja que imita a las que se usaban para los VHS, incluyendo carátula. Esta camiseta, 100% algodón, gracias a su atractiva presentación se convierte en un regalo ideal para cualquier fan de Star Wars.", imagen: "/imagenes/Merchandising/SW.jpg" },
  { id: 14, nombre: "Funko Pop Goku", precio: 18.99, descripcion: "Este muñeco Pop tiene el nº 615 de su colección de Dragon Ball Z, Funko Pop Vinyl Goku de la licencia Dragon Ball Z.", imagen: "/imagenes/Merchandising/goku.jpg" },
  { id: 15, nombre: "Taza Pokémon Gotta Catch 'em All", precio: 14.99, descripcion: "Descubre esta increíble taza de Pokémon, un producto 100% oficial que sorprenderá a cualquier fan de la saga. Fabricada en cerámica de alta calidad y con una gran capacidad de 460 ml, esta taza tiene una característica especial: cambia de aspecto cuando se vierte un líquido caliente, revelando un diseño único. Para preservar su magia, no es apta para microondas ni lavavajillas. Gracias a su llamativa presentación y su efecto térmico, se convierte en un regalo perfecto para cualquier entrenador Pokémon.", imagen: "/imagenes/Merchandising/PKMNTaza.jpg" },
  { id: 16, nombre: "Bolsa Minecraft Lenticular", precio: 12.99, descripcion: "Lleva tus snacks y almuerzo al mundo de Minecraft con esta increíble bolsa portameriendas lenticular. Con un diseño dinámico que cambia de apariencia según el ángulo de visión, esta bolsa es perfecta para los fans del popular videojuego. Su tamaño compacto y su resistente material la hacen ideal para el día a día, manteniendo tus meriendas seguras y organizadas. ¡Un accesorio imprescindible para cualquier aventurero de Minecraft!.", imagen: "/imagenes/Merchandising/minecraft.jpg" },

  // Puzzles
  { id: 17, nombre: "Fallout Puzzle Gaming 25th Anniversary", precio: 21.99, descripcion: "Celebre el legado icónico de Fallout con este rompecabezas de 1000 piezas, perfecto para los fanáticos de esta famosa franquicia de videojuegos. Este rompecabezas con licencia oficial mide 68 x 48 cm cuando está ensamblado y presenta ilustraciones vibrantes que rinden homenaje a personajes y elementos clave del universo Fallout. Si eres un entusiasta de los rompecabezas o un fanático de Fallout, esta pieza es ideal para pasar horas de diversión armando. Una vez completado, incluso puedes enmarcarlo y exhibirlo para mostrar tu pasión por este videojuego clásico.", imagen: "/imagenes/Puzzles/Fallout.jpg" },
  { id: 18, nombre: "Sonic The Hedgehog Puzzle", precio: 14.99, descripcion: "Disfruta del universo de Sonic the Hedgehog con este increíble rompecabezas de 500 piezas, ideal para fanáticos del icónico erizo azul. Con un tamaño de 49 x 36 cm una vez ensamblado, este rompecabezas con licencia oficial presenta coloridas ilustraciones que capturan la esencia de Sonic y sus amigos. Perfecto tanto para coleccionistas como para amantes de los rompecabezas, te brindará horas de entretenimiento mientras armas cada pieza. Además, al completarlo, puedes enmarcarlo y exhibirlo como una muestra de tu pasión por este legendario videojuego.", imagen: "/imagenes/Puzzles/sonic.jpg" },
  { id: 19, nombre: "Pokémon 3D Puzzle Master Ball", precio: 12.99, descripcion: "Descubre el increíble Pokémon 3D Puzzle Pokéballs: Master Ball, una fiel recreación en forma de rompecabezas tridimensional con 54 piezas. Con un diámetro de 7 cm y acompañado de una elegante peana para su exhibición, este rompecabezas con licencia oficial es ideal para coleccionistas y fanáticos de Pokémon. Su diseño detallado y vibrante captura la esencia de la icónica Master Ball, convirtiéndolo en una pieza perfecta para armar, disfrutar y exponer como parte de tu colección.", imagen: "/imagenes/Puzzles/masterball.jpg" },
  { id: 20, nombre: "Puzzle 3D Ravensburger Bola Grogu", precio: 15.95, descripcion: "El puzzle 3D Ravensburger Bola Grogu es un modelo de 72 piezas que, una vez montado, tiene un tamaño de 12,9 cm de diámetro. Esta pieza de colección pertenece a la línea oficial de Star Wars-Disney, con un diseño que recrea al querido personaje Grogu (más conocido como Baby Yoda) en forma de esfera. Las piezas del puzzle están diseñadas con precisión, lo que facilita su encaje y asegura una estructura estable y detallada. Ravensburger es conocida por la calidad de sus productos, y este puzzle 3D no es la excepción. Las piezas están fabricadas con materiales duraderos y con acabados de alta resolución, lo que permite una experiencia de montaje tanto entretenida como desafiante. Ideal para los fanáticos de Star Wars y de los puzzles 3D, este modelo captura la esencia del universo de Star Wars, convirtiéndolo en una pieza decorativa única una vez completado.", imagen: "/imagenes/Puzzles/puzzle-3d-ravensburger-bola-grogu.png" },
  { id: 21, nombre: "Puzzle Clementoni Panorama Señor de los Anillos", precio: 10.95, descripcion: "El puzzle Clementoni Panorama Señor de los Anillos es un rompecabezas panorámico compuesto por 1000 piezas, con un tamaño final de 98 x 33 cm. Esta pieza de colección está basada en el icónico universo de El Señor de los Anillos, y su diseño permite una visualización espectacular de escenas emblemáticas de la saga. El modelo es de la reconocida marca Clementoni, famosa por sus puzzles de alta calidad y su enfoque en detalles y precisión. Las piezas están elaboradas con materiales resistentes y tienen un acabado de alta definición, lo que asegura un encaje perfecto y una experiencia de montaje muy satisfactoria. Este puzzle panorámico es ideal para quienes disfrutan de desafíos visuales y buscan una pieza decorativa que celebre la magia de la Tierra Media. Al completarlo, se obtiene una imagen impresionante que captura la esencia de El Señor de los Anillos en su formato más épico. Gracias a su tamaño y formato panorámico, una vez terminado, este puzzle será una pieza central de cualquier espacio, convirtiéndose en una excelente opción tanto para fanáticos de la saga como para aficionados a los puzzles de calidad.", imagen: "/imagenes/Puzzles/puzzle-señor-de-los-anillos-1000-pzs.PNG" },

  // Juegos de Mesa
  { id: 22, nombre: "Monopoly", precio: 42.99, descripcion: "Monopoly es un juego de mesa basado en el intercambio y la compraventa de bienes raíces (normalmente, inspirados en los nombres de las calles de una determinada ciudad), hoy es propiedad de la empresa estadounidense Hasbro. Monopoly es uno de los juegos de mesa comerciales más vendidos del mundo.", imagen: "/imagenes/JuegosDeMesa/monopoly.jpg" },
  { id: 23, nombre: "Trivial Pursuit", precio: 28.99, descripcion: "El Trivial Pursuit Master es un juego de tablero clásico que consiste en responder a una serie de preguntas para ganar los adversarios. Cada jugador se mueve por el tablero mediante un dado y responde las preguntas que le tocan (marcadas por los colores de las casillas del tablero).", imagen: "/imagenes/JuegosDeMesa/trivial.jpg" },
  { id: 24, nombre: "Cluedo", precio: 27.99, descripcion: "Cluedo es un juego de mesa de detectives y misterio. El objetivo del juego es descubrir quién asesinó al Dr. Black, con qué arma, y en qué habitación se cometió el crimen.", imagen: "/imagenes/JuegosDeMesa/cluedo.jpg" },
  { id: 25, nombre: "Parchís", precio: 30.41, descripcion: "El Parchís es un clásico juego de mesa, tradicional en muchos países, que se juega con fichas que los jugadores mueven por un tablero en función de los resultados obtenidos al lanzar un dado. El objetivo del juego es llevar las 4 fichas de cada jugador desde su casilla de inicio hasta su casilla de meta antes que los demás jugadores. En la versión de Parchís para 8 jugadores, el tablero tiene más casillas, permitiendo que hasta 8 personas puedan jugar al mismo tiempo. Cada jugador comienza con 4 fichas en su casilla de salida, y a medida que avanza el juego, puede 'comer' las fichas de otros jugadores al caer en la misma casilla que ellas. Esto añade un componente de estrategia, ya que hay que decidir cuándo avanzar rápidamente y cuándo jugar de manera más cautelosa. También existe la posibilidad de formar equipos, donde jugadores de diferentes colores pueden aliarse para ganar juntos, lo que aumenta el nivel de interacción y colaboración entre los participantes.", imagen: "/imagenes/JuegosDeMesa/parchis.jpg" },
  { id: 26, nombre: "Estuche de Poker 300 piezas", precio: 34.86, descripcion: "El VEVOR Estuche de Póquer 300 Piezas es un set completo para disfrutar de juegos de azar en casa, especialmente diseñado para póquer, blackjack y otros juegos de casino. Este estuche incluye 300 fichas de póquer de plástico de alta calidad, cada una con un peso de 11,5 g y un tamaño de 40 x 3,3 mm, lo que asegura una experiencia de juego profesional y cómoda. Las fichas están diseñadas para tener un buen agarre y una larga durabilidad, lo que las hace perfectas para un uso frecuente. Además del set de fichas, el paquete incluye dos barajas de cartas, un botón de distribuidor y dos botones ciegos, elementos esenciales para juegos como Texas Hold'em y Blackjack. Todo esto viene en un estuche de transporte resistente, lo que facilita su almacenamiento y transporte. Este estuche es ideal para quienes buscan crear una experiencia de casino en casa, ya sea para jugar con amigos o en familia, proporcionando todo lo necesario para disfrutar de juegos clásicos de casino con comodidad y estilo.", imagen: "/imagenes/JuegosDeMesa/poker.jpg" },
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