const database = require("../infra/connection");

exports.getUsuarios = () => database.query("SELECT * FROM usuario");
exports.getUsuariosById = (id) =>
  database.query(`SELECT * FROM usuario WHERE id = '${id}';`);
exports.insertUsuario = (usuario) => {
  let resp = database.query(
    `INSERT INTO Usuario (nome, username, senha, email, telefone) VALUES ('${usuario.nome}', '${usuario.username}', '${usuario.senha}', '${usuario.email}', '${usuario.telefone}') RETURNING id;`
  );
  console.log(resp);
  return resp;
};
