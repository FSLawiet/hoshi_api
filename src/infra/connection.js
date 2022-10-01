const pgp = require("pg-promise")();
const bancoDeDados = pgp({
  connectionString: process.env.DB_CONN_STRING.toString(),
  max: 30,
});

module.exports = bancoDeDados;
