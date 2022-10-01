const pgp = require("pg-promise")();
const bancoDeDados = pgp({
  connectionString: process.env.DB_CONN_STRING,
  max: 30,
});

module.exports = bancoDeDados;
