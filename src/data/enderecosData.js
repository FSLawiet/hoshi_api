const database = require("../infra/connection");

exports.getEnderecos = async () =>
  await database.query("SELECT * FROM endereco");
exports.getEnderecosById = async (id) =>
  await database.query(`SELECT * FROM endereco WHERE id = '${id}';`);
exports.getEnderecosByUsuario = async (user_id) =>
  await database.query(`SELECT * FROM endereco WHERE usuario = '${user_id}';`);
