const database = require("../infra/connection");

exports.getUsuarios = async () =>
  await database.query(
    "SELECT id, nome, username, email, telefone FROM usuario"
  );
exports.getUsuariosById = async (id) => {
  return await database.one(
    `SELECT id, nome, username, email, telefone FROM usuario WHERE id = ${id};`
  );
};
exports.insertUsuario = (usuario) => {
  let resp = database.query(
    `INSERT INTO Usuario (nome, username, senha, email, telefone) VALUES ('${usuario.nome}', '${usuario.username}', '${usuario.senha}', '${usuario.email}', '${usuario.telefone}') RETURNING id;`
  );
  console.log(resp);
  return resp;
};
