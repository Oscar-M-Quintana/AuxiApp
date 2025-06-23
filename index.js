// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const PlanillaAuxilio = require("./models/PlanillaAuxilio");
const planillasRoutes = require("./routes/planillas");
const authRoutes = require("./routes/auth");
const usuarioRoutes = require('./routes/usuarios');
const mapaRoutes = require('./routes/mapa');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Usar rutas desde el archivo externo
app.use("/planillas", planillasRoutes);
app.use("/auth", authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/mapa', mapaRoutes);
app.use(express.static(path.join(__dirname, 'public')));


// Conectar a la base de datos y sincronizar modelos
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch((error) => {
  console.error("Error al conectar con la base de datos:", error);
});
