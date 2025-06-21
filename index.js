const express = require('express');
const sequelize = require("./database");
const PlanillaAuxilio = require("./models/PlanillaAuxilio");
const planillasRoutes = require('./routes/planillas');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/planillas", async (req, res) => {
  try {
    const planillas = await PlanillaAuxilio.findAll();
    res.json(planillas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error leyendo planillas" });
  }
});

app.post("/planillas", async (req, res) => {
  try {
    const nueva = await PlanillaAuxilio.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creando planilla", details: err.message });
  }
});

sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
}).catch(err => {
  console.error("❌ Error al sincronizar la DB:", err);
});

app.use('/planillas', planillasRoutes);