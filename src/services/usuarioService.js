const bcrypt = require("bcrypt");
const saltRounds = 12;
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
exports.insertUsuario = async (usuario) => {
  if (!usuario.nome) throw new Error("Nome do cliente não informado.");
  else if (!usuario.username)
    throw new Error("Nome de usuário do cliente não informado");
  else if (!usuario.senha) throw new Error("Senha do cliente não informada.");
  else if (!usuario.email) throw new Error("E-mail do cliente não informado.");
  else if (!usuario.telefone)
    throw new Error("Telefone do cliente não informado.");
  else {
    //let id = produtosData.insertProduto(produto);
    //await sendMessage(this.getProdutosById(id).phone);
    //return id;
    await bcrypt.hash(usuario.senha, saltRounds, async (err, hash) => {
      if (!err || hash != null) {
        await bcrypt.compare(usuario.senha, hash, async (err, res) => {
          if (res || !err) {
            usuario.senha = hash;
            return await usuariosData.insertUsuario(usuario);
          } else throw new Error("Erro na qualificação da senha do usuário.");
        });
      } else throw new Error("Erro na encriptação da senha do usuário.");
    });
  }
};
exports.updateUsuario = async (id, usuario) => {
  return await usuariosData.updateUsuario(id, usuario);
};
exports.deleteUsuario = async (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de usuário.");
  else return await usuariosData.deleteUsuario(id);
};
