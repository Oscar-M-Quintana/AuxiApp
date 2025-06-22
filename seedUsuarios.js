// seedUsuarios.js
const bcrypt = require("bcrypt");
const sequelize = require("./database");
const Usuario = require("./models/Usuario");

async function seed() {
  await sequelize.sync({ force: false });
  const hash = await bcrypt.hash("123456", 10);
  await Usuario.create({
    nombre: "Operador Prueba",
    email: "operador@auxiapp.com",
    password: hash,
    rol: "operador"
  });
  console.log("Operador creado");
  process.exit();
}

seed().catch(console.error);

