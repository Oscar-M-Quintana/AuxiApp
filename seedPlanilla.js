// seedPlanilla.js
// Sedd script para crear planillas de auxilio predefinidas en la base de datos
require("dotenv").config();
const sequelize = require("./database");
const PlanillaAuxilio = require("./models/PlanillaAuxilio");

const run = async () => {
    await sequelize.sync();

    const planillas = [
        {
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
        },
        {
            cliente: "Lucía Fernández",
            telefono_contacto: "1166778899",
            ubicacion: "Calle Corrientes 5200",
            ubicacion_maps: "https://maps.google.com/?q=-34.5984,-58.4242",
            latitud: -34.5984,
            longitud: -58.4242,
            finalizada: false,
            datos_auto: "Volkswagen Gol blanco, patente ZXY987",
            numero_poliza: "SURA987654",
            aseguradora: "Seguros Sura",
            tipo_auxilio: "mecánica ligera",
            fecha: new Date(),
            estado: "creado",
        },
        {
            cliente: "Carlos Domínguez",
            telefono_contacto: "1199887766",
            ubicacion: "Av. San Juan 3500",
            ubicacion_maps: "https://maps.google.com/?q=-34.6285,-58.4123",
            latitud: -34.6285,
            longitud: -58.4123,
            finalizada: false,
            datos_auto: "Ford Focus azul, patente HJK321",
            numero_poliza: "LCA222333",
            aseguradora: "Soporte LaCaja",
            tipo_auxilio: "grúa",
            fecha: new Date(),
            estado: "creado",
        },
        {
            cliente: "Mariana López",
            telefono_contacto: "1144332211",
            ubicacion: "Av. Cabildo 3200",
            ubicacion_maps: "https://maps.google.com/?q=-34.5615,-58.4512",
            latitud: -34.5615,
            longitud: -58.4512,
            finalizada: false,
            datos_auto: "Chevrolet Onix rojo, patente MNO456",
            numero_poliza: "SURA334455",
            aseguradora: "Seguros Sura",
            tipo_auxilio: "mecánica ligera",
            fecha: new Date(),
            estado: "creado",
        },
        {
            cliente: "Sofía García",
            telefono_contacto: "1177889900",
            ubicacion: "Av. La Plata 800",
            ubicacion_maps: "https://maps.google.com/?q=-34.6268,-58.4301",
            latitud: -34.6268,
            longitud: -58.4301,
            finalizada: false,
            datos_auto: "Renault Kwid negro, patente PQR678",
            numero_poliza: "LCA445566",
            aseguradora: "Soporte LaCaja",
            tipo_auxilio: "grúa",
            fecha: new Date(),
            estado: "creado",
        }
    ];

    for (const p of planillas) {
        await PlanillaAuxilio.create(p);
        console.log(`✅ Planilla creada para: ${p.cliente}`);
    }

    process.exit();
};

run();
