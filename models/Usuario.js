const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Usuario = sequelize.define("Usuario", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM("aseguradora", "operador", "auxilio"),
    allowNull: false
  },
  tipo_auxilio: {
    type: DataTypes.ENUM("grúa", "mecánica ligera"),
    allowNull: true // solo se usa si el rol es auxilio
  }
});

module.exports = Usuario;

