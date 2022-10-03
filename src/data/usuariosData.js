const database = require("../infra/connection");

exports.getUsuarios = async () => await database.query("SELECT * FROM usuario");
exports.getUsuariosById = async (id) =>
  await database.query(`SELECT * FROM usuario WHERE id = '${id}';`);
