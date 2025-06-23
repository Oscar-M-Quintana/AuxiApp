// routes/auth.js
// Este archivo maneja la autenticación de usuarios, incluyendo el login y la generación de tokens
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(401).json({ error: "Usuario no encontrado" });

        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign(
  {
    id: usuario.id,
    nombre: usuario.nombre,  // ✅ incluido
    email: usuario.email,
    rol: usuario.rol
  },
  process.env.JWT_SECRET || "secreto123",
  { expiresIn: "1h" }
);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error en el login" });
    }
});

module.exports = router;
