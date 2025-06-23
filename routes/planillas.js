// routes/planillas.js
const express = require('express');
const router = express.Router();
const PlanillaAuxilio = require('../models/PlanillaAuxilio');
const Usuario = require('../models/Usuario');
const authenticate = require('../middleware/authenticate');
const authorizeRole = require("../middleware/authorizeRole");

// Middleware para proteger y validar el token
router.use(authenticate);

// Asignar un auxilio disponible a una planilla
router.post('/:id/asignar', async (req, res) => {
    try {
        const planilla = await PlanillaAuxilio.findByPk(req.params.id);
        if (!planilla) return res.status(404).json({ error: 'Planilla no encontrada' });
        
        // Buscar un auxilio disponible y compatible con el tipo de auxilio solicitado
        const auxilio = await Usuario.findOne({
            where: {
                rol: 'auxilio',
                disponible: true,
                tipo_auxilio: planilla.tipo_auxilio
            }
        });
        
        if (!auxilio) return res.status(404).json({ error: 'No hay auxilios disponibles' });
        
        // Asignar
        planilla.vehiculo_asignado_id = auxilio.id;
        planilla.estado = 'asignado';
        planilla.hora_asignacion = new Date();
        await planilla.save();
        
        // Actualizar auxilio como no disponible
        auxilio.disponible = false;
        await auxilio.save();
        
        res.json({ mensaje: 'Auxilio asignado', planilla });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error asignando auxilio' });
    }
});

// Finalizar una planilla (solo el auxilio asignado)
router.post('/:id/finalizar', async (req, res) => {
    try {
        const planilla = await PlanillaAuxilio.findByPk(req.params.id);
        if (!planilla) return res.status(404).json({ error: 'Planilla no encontrada' });
        
        if (req.user.rol !== 'auxilio' || req.user.id !== planilla.vehiculo_asignado_id) {
            return res.status(403).json({ error: 'No autorizado para finalizar esta planilla' });
        }
        
        planilla.estado = 'finalizado';
        planilla.hora_salida = new Date();
        await planilla.save();
        
        const auxilio = await Usuario.findByPk(req.user.id);
        auxilio.disponible = true;
        await auxilio.save();
        
        res.json({ mensaje: 'Planilla finalizada', planilla });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al finalizar la planilla' });
    }
});

// Marcar como finalizada por el operador
router.post("/:id/finalizar", authenticate, authorizeRole("operador"), async (req, res) => {
    try {
        const { observaciones_finales } = req.body;
        const planilla = await PlanillaAuxilio.findByPk(req.params.id);
        
        if (!planilla) return res.status(404).json({ error: "Planilla no encontrada" });
        
        planilla.estado = "finalizado";
        planilla.observaciones_finales = observaciones_finales || null;
        planilla.updatedAt = new Date();
        await planilla.save();
        
        res.json({ mensaje: "Planilla finalizada", planilla });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al finalizar la planilla" });
    }
});

// Crear nueva planilla (solo aseguradora)
router.post("/", authorizeRole("aseguradora"), async (req, res) => {
  try {
    const nueva = await PlanillaAuxilio.create({
      ...req.body,
      aseguradora_id: req.user.id, // asumimos que la aseguradora la está creando
      estado: "pendiente",
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear planilla" });
  }
});

// Obtener todas las planillas (solo operador)
router.get("/", authorizeRole("operador"), async (req, res) => {
  try {
    const planillas = await PlanillaAuxilio.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(planillas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener planillas" });
  }
});

module.exports = router;
