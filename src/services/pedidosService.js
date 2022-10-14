const pedidosData = require("../data/pedidosData");
const produtosData = require("../data/produtosData");
const enderecosData = require("../data/enderecosData");
const usuariosData = require("../data/usuariosData");
const sendMessage = require("../lib/twilio");

exports.getPedidos = async () => {
  return await pedidosData.getPedidos();
};
exports.getPedidosById = async (id) => {
  return await pedidosData.getPedidosById(id);
};
exports.getPedidosByUserId = async (usuario) => {
  return await pedidosData.getPedidosByUserId(usuario);
};
exports.insertPedidos = async (pedido) => {
  const resp = await pedidosData
    .insertPedidos(pedido);
      pedidosData.getPedidosById(resp[0].id)
      .then(async (pedido) => {
        const usuario = await usuariosData.getUsuariosById(pedido.usuario);
        const messageResp = await sendMessage(usuario.telefone);
        console.log(messageResp);
      });
      return resp;
}