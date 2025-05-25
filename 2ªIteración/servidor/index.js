const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser"); // ✅ asegúrate de importar arriba
require("dotenv").config();

const app = express();

// 1️⃣ Habilitar cookies y sesiones primero
app.use(cookieParser());
app.use(session({
    secret: "secreto-ultra-seguro",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: false,          // true solo si usas HTTPS
        httpOnly: true,
        sameSite: "lax"         // o "none" si trabajas con HTTPS y subdominios
    }
}));

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';

// 2️⃣ Configurar CORS con credentials
app.use(cors({
    origin: FRONTEND,
    credentials: true
}));

// 3️⃣ Habilitar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4️⃣ Conectar con Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    console.log("🌐 Usando base de datos:", mongoose.connection.db.databaseName);
  })
  .catch(err => console.error("❌ Error al conectar a MongoDB", err));

// 5️⃣ Rutas (después de sesiones y CORS)
app.use("/api/productos", require("./rutas/productos"));
app.use("/api/usuarios", require("./rutas/usuarios"));

// 6️⃣ Arrancar el servidor
app.listen(process.env.PORT, () =>
    console.log(`🚀 Servidor Express en http://localhost:${process.env.PORT}`)
);
