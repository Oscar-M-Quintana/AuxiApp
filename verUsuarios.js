require("dotenv").config();
const sequelize = require("./database");
const Usuario = require("./models/Usuario");

sequelize.sync().then(async () => {
  const usuarios = await Usuario.findAll();
  console.log(usuarios.map(u => u.toJSON()));
  process.exit();
});
