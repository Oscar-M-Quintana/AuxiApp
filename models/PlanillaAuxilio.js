// models/PlanillaAuxilio.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PlanillaAuxilio = sequelize.define("PlanillaAuxilio", {
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_contacto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion_maps: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  datos_auto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_poliza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aseguradora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_auxilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "creado",
  },
  operador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  vehiculo_asignado_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hora_asignacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  hora_arribo: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  hora_salida: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  comentarios_auxilio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  observaciones_finales: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

module.exports = PlanillaAuxilio;
