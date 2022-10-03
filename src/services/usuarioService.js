const usuariosData = require("../data/usuariosData");
const enderecosData = require("../data/enderecosData");

exports.getUsuarios = async () => {
  let usuarios = await usuariosData.getUsuarios();
  let resp = [];
  for (usuario of usuarios) {
    let enderecos = await enderecosData.getEnderecosByUsuario(usuario.id);
    resp.push({
      ...usuario,
      enderecos,
    });
  }
  return resp;
};
exports.getUsuariosById = async (id) => {
  if (id === NaN) throw new Error("Erro na requisição de usuario.");
  else {
    let usuarios = await usuariosData.getUsuariosById(id);
    let resp = [];
    for (usuario of usuarios) {
      let enderecos = await enderecosData.getEnderecosByUsuario(usuario.id);
      resp.push({
        ...usuario,
        enderecos,
      });
    }
    return resp;
  }
};
