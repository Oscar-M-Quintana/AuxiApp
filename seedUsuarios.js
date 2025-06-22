const bcrypt = require("bcrypt");
const sequelize = require("./database");
const Usuario = require("./models/Usuario");

async function seed() {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash("1234", 10);

  await Usuario.bulkCreate([
    {
      email: "operador1@lacaja.com.ar",
      password: hashedPassword,
      rol: "operador"
    },
    {
      email: "operador2@atm.com.ar",
      password: hashedPassword,
      rol: "operador"
    },
    {
      email: "aseguradora1@lacaja.com.ar",
      password: hashedPassword,
      rol: "aseguradora"
    },
    {
      email: "aseguradora2@atm.com.ar",
      password: hashedPassword,
      rol: "aseguradora"
    },
    {
      email: "grua1@auxilios.com",
      password: hashedPassword,
      rol: "auxilio",
      tipo_auxilio: "grúa"
    },
    {
      email: "mecanico1@auxilios.com",
      password: hashedPassword,
      rol: "auxilio",
      tipo_auxilio: "mecánica ligera"
    }
  ]);

  console.log("Usuarios creados con éxito");
  process.exit();
}

seed();
