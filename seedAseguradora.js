// seedAseguradora.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const Usuario = require("./models/Usuario");

async function crearAseguradora() {
  try {
    const password = "aseg1234";
    const hashed = await bcrypt.hash(password, 10);
    const u = await Usuario.create({
      nombre: "Soporte LaCaja",
      email: "soporte@lacaja.com.ar",
      password: hashed,
      rol: "aseguradora",
      tipo_auxilio: null
    });
    console.log("✅ Usuario aseguradora creado:", u.email);
  } catch (e) {
    console.error("❌ Error creando aseguradora:", e);
  }
}

crearAseguradora();
