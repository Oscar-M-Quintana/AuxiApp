require("dotenv").config();
const sequelize = require("./database");
const PlanillaAuxilio = require("./models/PlanillaAuxilio");

const run = async () => {
  await sequelize.sync();

  await PlanillaAuxilio.create({
    cliente: "Juan Pérez",
    telefono_contacto: "1122334455",
    ubicacion: "Av. Rivadavia 1234",
    ubicacion_maps: "https://maps.google.com/?q=-34.6118,-58.4173",
    latitud: -34.6118,
    longitud: -58.4173,
    finalizada: false,
    datos_auto: "Toyota Corolla gris, patente ABC123",
    numero_poliza: "LCA12345678",
    aseguradora: "Soporte LaCaja",
    tipo_auxilio: "grúa",
    fecha: new Date(),
    estado: "creado",
    operador_id: null,
    vehiculo_asignado_id: null,
    hora_asignacion: null,
    hora_arribo: null,
    hora_salida: null,
    comentarios_auxilio: null,
    observaciones_finales: null
  });

  console.log("✅ Planilla de prueba creada");
  process.exit();
};

run();
