// routes/usuarios.js
const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const authenticate = require("../middleware/authenticate");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

router.post("/", authenticate, authorizeRole("operador"), async (req, res) => {
  const { nombre, email, password, rol, tipo_auxilio } = req.body;

  // Validaciones
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  const rolesPermitidos = ["operador", "aseguradora", "auxilio"];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  if (rol === "auxilio" && !tipo_auxilio) {
    return res.status(400).json({ error: "El tipo de auxilio es obligatorio para usuarios con rol 'auxilio'" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      tipo_auxilio: rol === "auxilio" ? tipo_auxilio : null
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

// Listar todos los usuarios (solo operador)
router.get("/", authenticate, authorizeRole("operador"), async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Listar todos los usuarios de tipo "auxilio" (solo operador)
router.get("/auxilios", authenticate, authorizeRole("operador"), async (req, res) => {
  try {
    const auxilios = await Usuario.findAll({ where: { rol: "auxilio" } });
    res.json(auxilios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los auxilios" });
  }
});


module.exports = router;

