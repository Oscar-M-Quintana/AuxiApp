// seedOperador.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("./database");
const Usuario = require("./models/Usuario");

const run = async () => {
  await sequelize.sync(); // asegurarse que la DB esté lista

  const hashedPassword = await bcrypt.hash("123456", 10);

  await Usuario.create({
    nombre: "Operador Principal",
    email: "operador@auxi.com",
    password: hashedPassword,
    rol: "operador",
  });

  console.log("✅ Usuario operador creado");
  process.exit();
};

run();
