// cargarProductos.js
require("dotenv").config();
const mongoose = require("mongoose");

// Modelo de producto
const productoSchema = new mongoose.Schema({
  tipo: String,
  nombre: String,
  precio: Number,
  descripcion: String,
  imagen: String,
  extra: String
}, { versionKey: false });

const Producto = mongoose.model("Producto", productoSchema);

const productos = [
  // T1 - Videojuegos
  {
    tipo: "T1",
    nombre: "Super Mario World",
    precio: 14.99,
    descripcion: "La primera aventura de Mario y Luigi para Super NES...",
    imagen: "imagenes/Videojuegos/super_mario_world.webp",
    extra: "Nintendo"
  },
  {
    tipo: "T1",
    nombre: "The Legend of Zelda: A Link to the Past",
    precio: 9.99,
    descripcion: "Link recibe un mensaje de Zelda y debe enfrentarse a Ganon...",
    imagen: "imagenes/Videojuegos/legendOfZelda.jpg",
    extra: "Nintendo"
  },
  {
    tipo: "T1",
    nombre: "Street Fighter II",
    precio: 7.99,
    descripcion: "Juego de lucha de Capcom que revolucionó el género.",
    imagen: "imagenes/Videojuegos/streetFighter2.jpg",
    extra: "Capcom"
  },
  {
    tipo: "T1",
    nombre: "Grand Theft Auto V",
    precio: 19.99,
    descripcion: "Tres personajes sobreviven en un mundo criminal y caótico.",
    imagen: "imagenes/Videojuegos/GTAV.jpg",
    extra: "Rockstar Games"
  },
  {
    tipo: "T1",
    nombre: "Mario Kart 8 Deluxe",
    precio: 39.99,
    descripcion: "Compite en 48 circuitos incluyendo contenido adicional.",
    imagen: "imagenes/Videojuegos/MK8.jpg",
    extra: "Nintendo"
  },
  {
    tipo: "T1",
    nombre: "Dragon Ball Sparking! ZERO",
    precio: 69.99,
    descripcion: "Peleas épicas con personajes de Dragon Ball en escenarios destructibles.",
    imagen: "imagenes/Videojuegos/DBSZ.jpg",
    extra: "Bandai Namco"
  },

  // T2 - Libros
  {
    tipo: "T2",
    nombre: "Final Fantasy: Level 99",
    precio: 24.99,
    descripcion: "Bestiario de monstruos de la saga Final Fantasy.",
    imagen: "imagenes/Libros/FF99.jpg",
    extra: "Plan B Publicaciones"
  },
  {
    tipo: "T2",
    nombre: "Cómo se hizo Assassin's Creed. 15º aniversario",
    precio: 32.99,
    descripcion: "Análisis visual e histórico del desarrollo de Assassin's Creed.",
    imagen: "imagenes/Libros/AC15.jpg",
    extra: "Minotauro"
  },
  {
    tipo: "T2",
    nombre: "Batman: un héroe de videojuego",
    precio: 11.99,
    descripcion: "Recorrido por la historia de Batman en los videojuegos.",
    imagen: "imagenes/Libros/Batman.jpg",
    extra: "Héroes de Papel"
  },
  {
    tipo: "T2",
    nombre: "Harry Potter y la piedra filosofal",
    precio: 16.10,
    descripcion: "Primera entrega de la saga mágica más famosa del mundo.",
    imagen: "imagenes/Libros/HP_piedra_filosofal.jpg",
    extra: "Salamandra"
  },
  {
    tipo: "T2",
    nombre: "El Hobbit ~ J.R.R. Tolkien",
    precio: 15.20,
    descripcion: "Bilbo Bolsón vive una aventura épica para recuperar un tesoro.",
    imagen: "imagenes/Libros/el_Hobbit.jpg",
    extra: "Minotauro"
  },

  // T3 - Merchandising
  {
    tipo: "T3",
    nombre: "Funko Pop Harry Potter Gryffindor",
    precio: 16.99,
    descripcion: "Funko Pop oficial del universo de Harry Potter.",
    imagen: "imagenes/Merchandising/HP.jpg",
    extra: "Funko"
  },
  {
    tipo: "T3",
    nombre: "Camiseta Star Wars Logo Azul",
    precio: 11.99,
    descripcion: "Camiseta retro de Star Wars con caja estilo VHS.",
    imagen: "imagenes/Merchandising/SW.jpg",
    extra: "DetodoExpress"
  },
  {
    tipo: "T3",
    nombre: "Funko Pop Goku",
    precio: 18.99,
    descripcion: "Figura Pop de Goku n.º 615 de Dragon Ball Z.",
    imagen: "imagenes/Merchandising/goku.jpg",
    extra: "Funko"
  },
  {
    tipo: "T3",
    nombre: "Taza termocromática Pokémon",
    precio: 14.99,
    descripcion: "Taza que cambia de aspecto con el calor.",
    imagen: "imagenes/Merchandising/PKMNTaza.jpg",
    extra: "ABYSTYLE"
  },
  {
    tipo: "T3",
    nombre: "Bolsa portameriendas Minecraft Lenticular",
    precio: 12.99,
    descripcion: "Bolsa de almuerzo con efecto lenticular de Minecraft.",
    imagen: "imagenes/Merchandising/minecraft.jpg",
    extra: "Kids Licensing"
  },

  // T4 - Puzzles
  {
    tipo: "T4",
    nombre: "Fallout Puzzle Gaming 25th Anniversary",
    precio: 21.99,
    descripcion: "Puzzle de 1000 piezas con arte de Fallout.",
    imagen: "imagenes/Puzzles/Fallout.jpg",
    extra: "1000"
  },
  {
    tipo: "T4",
    nombre: "Sonic - The Hedgehog puzzle Classic Sonic",
    precio: 14.99,
    descripcion: "Puzzle de Sonic con 500 piezas para fans clásicos.",
    imagen: "imagenes/Puzzles/sonic.jpg",
    extra: "500"
  },
  {
    tipo: "T4",
    nombre: "Pokémon 3D puzzle Pokéballs: Master Ball",
    precio: 12.99,
    descripcion: "Puzzle 3D oficial de Pokémon con base expositora.",
    imagen: "imagenes/Puzzles/masterball.jpg",
    extra: "54"
  },
  {
    tipo: "T4",
    nombre: "Puzzle 3D Ravensburger Bola Grogu",
    precio: 15.95,
    descripcion: "Puzzle 3D esférico de Baby Yoda con 72 piezas.",
    imagen: "imagenes/Puzzles/puzzle-3d-ravensburger-bola-grogu.png",
    extra: "74"
  },
  {
    tipo: "T4",
    nombre: "Puzzle Clementoni Panorama Señor de los Anillos",
    precio: 10.95,
    descripcion: "Puzzle panorámico de 1000 piezas de El Señor de los Anillos.",
    imagen: "imagenes/Puzzles/puzzle-señor-de-los-anillos-1000-pzs.PNG",
    extra: "1000"
  },

  // T5 - Juegos de mesa
  {
    tipo: "T5",
    nombre: "Monopoly",
    precio: 42.99,
    descripcion: "Clásico juego de compra y venta de propiedades.",
    imagen: "imagenes/JuegosDeMesa/monopoly.jpg",
    extra: "3-8"
  },
  {
    tipo: "T5",
    nombre: "Trivial Pursuit",
    precio: 28.99,
    descripcion: "Juego de preguntas y respuestas por categorías.",
    imagen: "imagenes/JuegosDeMesa/trivial.jpg",
    extra: "2-6"
  },
  {
    tipo: "T5",
    nombre: "Cluedo",
    precio: 27.99,
    descripcion: "Descubre al asesino, el arma y el lugar del crimen.",
    imagen: "imagenes/JuegosDeMesa/cluedo.jpg",
    extra: "2-6"
  },
  {
    tipo: "T5",
    nombre: "Parchis",
    precio: 30.41,
    descripcion: "Versión de parchís para hasta 8 jugadores.",
    imagen: "imagenes/JuegosDeMesa/parchis.jpg",
    extra: "8"
  },
  {
    tipo: "T5",
    nombre: "VEVOR Estuche de Poker 300 Piezas",
    precio: 34.86,
    descripcion: "Set completo con fichas, cartas y botones ciegos.",
    imagen: "imagenes/JuegosDeMesa/poker.jpg",
    extra: "10"
  }
];


// Conexión y carga
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");
    await Producto.deleteMany(); // Opcional: limpia la colección antes de insertar
    const resultado = await Producto.insertMany(productos);
    console.log(`🎉 Se insertaron ${resultado.length} productos`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error al conectar o insertar en MongoDB", err);
  });
