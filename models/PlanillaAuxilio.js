// models/PlanillaAuxilio.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PlanillaAuxilio = sequelize.define("PlanillaAuxilio", {
  cliente: DataTypes.STRING,
  ubicacion: DataTypes.STRING,
  tipo_auxilio: DataTypes.STRING,
  fecha: DataTypes.DATE,
  estado: DataTypes.STRING,
  datos_extra: DataTypes.TEXT
});

module.exports = PlanillaAuxilio;
