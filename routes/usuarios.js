// routes/usuarios.js
const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = express.Router();

// Middleware para verificar token y rol operador
const verificarOperador = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = require("jsonwebtoken").verify(token, process.env.JWT_SECRET || "secreto123");
    if (payload.rol !== "operador") return res.status(403).json({ error: "No autorizado" });
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Registro de usuario solo por operador
router.post("/usuarios", verificarOperador, async (req, res) => {
  const { nombre, email, password, rol, tipo_auxilio } = req.body;
  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({ nombre, email, password: hash, rol, tipo_auxilio });
    res.status(201).json({ mensaje: "Usuario creado", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: "Error creando usuario" });
  }
});

module.exports = router;
