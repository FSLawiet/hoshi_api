const pgp = require("pg-promise")();
const bancoDeDados = pgp({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: "dpg-ccrifqirrk08u0m08k60-a.oregon-postgres.render.com",
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: true,
});

module.exports = bancoDeDados;
