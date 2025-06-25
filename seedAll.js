// sedAll.js
// Seed script que crea usuarios predefinidos en la base de datos
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
        // Operadores
        {
            nombre: "Operador Principal",
            email: "operador@auxiapp.com",
            password: passOperador,
            rol: "operador",
        },
        {
            nombre: "Operador Secundario",
            email: "operador2@auxiapp.com",
            password: passOperador,
            rol: "operador",
        },

        // Aseguradoras
        {
            nombre: "Soporte LaCaja",
            email: "soporte@lacaja.com.ar",
            password: passAseg,
            rol: "aseguradora",
            tipo_auxilio: null
        },
        {
            nombre: "Seguros Sura",
            email: "contacto@sura.com.ar",
            password: passAseg,
            rol: "aseguradora",
            tipo_auxilio: null
        },

        // Auxilios
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
        },
        {
            nombre: "Mecánico Microcentro",
            email: "mecanico.micro@auxi.com",
            password: passAux,
            rol: "auxilio",
            tipo_auxilio: "mecánica ligera",
            latitud: -34.6037,
            longitud: -58.3816
        },
        {
            nombre: "Grúa Belgrano",
            email: "grua.belgrano@auxi.com",
            password: passAux,
            rol: "auxilio",
            tipo_auxilio: "grúa",
            latitud: -34.5523,
            longitud: -58.4562
        },
        {
            nombre: "Mecánico Zona Oeste",
            email: "mecanico.oeste@auxi.com",
            password: passAux,
            rol: "auxilio",
            tipo_auxilio: "mecánica ligera",
            latitud: -34.6400,
            longitud: -58.5200
        },
        {
            nombre: "Grúa Zona Sur",
            email: "grua.sur@auxi.com",
            password: passAux,
            rol: "auxilio",
            tipo_auxilio: "grúa",
            latitud: -34.7000,
            longitud: -58.4000
        },
        {
            nombre: "Mecánico Urquiza",
            email: "mecanico.urquiza@auxi.com",
            password: passAux,
            rol: "auxilio",
            tipo_auxilio: "mecánica ligera",
            latitud: -34.5860,
            longitud: -58.4750
        }
    ];

    for (const u of usuarios) {
        await Usuario.create(u);
        console.log(`✅ Usuario creado: ${u.email}`);
    }

    process.exit();
};

run();

