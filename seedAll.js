// seedAll.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("./database");
const Usuario = require("./models/Usuario");

const run = async () => {
  await sequelize.sync();

  const passOperador = await bcrypt.hash("123456", 10);
  const passAseg = await bcrypt.hash("aseg1234", 10);
  const passAux = await bcrypt.hash("aux123", 10);

  const usuarios = [
    {
      nombre: "Operador Principal",
      email: "operador@auxi.com",
      password: passOperador,
      rol: "operador",
    },
    {
      nombre: "Soporte LaCaja",
      email: "soporte@lacaja.com.ar",
      password: passAseg,
      rol: "aseguradora",
      tipo_auxilio: null
    },
    {
      nombre: "Grúa Zona Norte",
      email: "grua.norte@auxi.com",
      password: passAux,
      rol: "auxilio",
      tipo_auxilio: "grúa",
      latitud: -34.5001,
      longitud: -58.4793
    },
    {
      nombre: "Mecánica Sur",
      email: "mecanica.sur@auxi.com",
      password: passAux,
      rol: "auxilio",
      tipo_auxilio: "mecánica ligera",
      latitud: -34.6795,
      longitud: -58.3812
    },
    {
      nombre: "Grúa Oeste",
      email: "grua.oeste@auxi.com",
      password: passAux,
      rol: "auxilio",
      tipo_auxilio: "grúa",
      latitud: -34.6250,
      longitud: -58.5240
    }
  ];

  for (const u of usuarios) {
    await Usuario.create(u);
    console.log(`✅ Usuario creado: ${u.email}`);
  }

  process.exit();
};

run();
