const pgp = require("pg-promise")();
const bancoDeDados = pgp({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports = bancoDeDados;
