const database = require("../infra/connection");

exports.getEnderecos = async () =>
  await database.query(
    "SELECT id, nome, apelido, rua, numero, bairro, cidade, estado, cep FROM endereco"
  );
exports.getEnderecosById = async (id) =>
  await database.query(
    `SELECT id, nome, apelido, rua, numero, bairro, cidade, estado, cep FROM endereco WHERE id = '${id}';`
  );
exports.getEnderecosByUsuario = async (user_id) =>
  await database.query(
    `SELECT id, nome, apelido, rua, numero, bairro, cidade, estado, cep FROM endereco WHERE usuario = '${user_id}';`
  );
