const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Esto es necesario si estás usando un certificado SSL auto-firmado
    }
  },
  logging: false // desactivar logs de SQL en consola
});

module.exports = sequelize;
