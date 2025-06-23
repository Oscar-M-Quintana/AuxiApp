const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const PlanillaAuxilio = require('../models/PlanillaAuxilio');
const authenticate = require('../middleware/authenticate');

// Protegemos con login
router.use(authenticate);

router.get('/datos', async (req, res) => {
  try {
    const auxilios = await Usuario.findAll({
      where: { rol: 'auxilio' },
      attributes: ['id', 'nombre', 'latitud', 'longitud']
    });

    const planillas = await PlanillaAuxilio.findAll({
      where: { finalizada: false },
      attributes: ['id', 'descripcion', 'latitud', 'longitud']
    });

    res.json({ auxilios, planillas });
  } catch (err) {
    console.error('Error en /mapa/datos:', err);
    res.status(500).json({ error: 'Error al obtener datos del mapa' });
  }
});

module.exports = router;
