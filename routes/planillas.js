// routes/planillas.js
const express = require("express");
const router = express.Router();
const PlanillaAuxilio = require("../models/PlanillaAuxilio");

// Crear nueva planilla (aseguradora)
router.post("/", async (req, res) => {
  try {
    const planilla = await PlanillaAuxilio.create(req.body);
    res.status(201).json(planilla);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todas las planillas
router.get("/", async (req, res) => {
  try {
    const planillas = await PlanillaAuxilio.findAll();
    res.json(planillas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una planilla por ID
router.get("/:id", async (req, res) => {
  try {
    const planilla = await PlanillaAuxilio.findByPk(req.params.id);
    if (planilla) {
      res.json(planilla);
    } else {
      res.status(404).json({ error: "Planilla no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una planilla por ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await PlanillaAuxilio.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const planilla = await PlanillaAuxilio.findByPk(req.params.id);
      res.json(planilla);
    } else {
      res.status(404).json({ error: "Planilla no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
