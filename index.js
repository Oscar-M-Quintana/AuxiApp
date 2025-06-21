// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const PlanillaAuxilio = require("./models/PlanillaAuxilio");
const planillasRoutes = require("./routes/planillas");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Usar rutas desde el archivo externo
app.use("/planillas", planillasRoutes);

// Conectar a la base de datos y sincronizar modelos
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch((error) => {
  console.error("Error al conectar con la base de datos:", error);
});
