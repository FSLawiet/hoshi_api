const pedidosData = require("../data/pedidosData");
const produtosData = require("../data/produtosData");
const enderecosData = require("../data/enderecosData");
const usuariosData = require("../data/usuariosData");
const sendMessage = require("../lib/twilio");

exports.getPedidos = () => {
  return pedidosData.getPedidos();
};
exports.getPedidosById = (id) => {
  return pedidosData.getPedidosById(id);
};
exports.getPedidosByUserId = (usuario) => {
  return pedidosData.getPedidosByUserId(usuario);
};
exports.insertPedido = (pedido) => {
  const resp = pedidosData.insertPedido(pedido);
  const usuario = usuariosData.getUsuariosById(
    pedidosData.getPedidosById(resp[0].id).usuario
  )[0];
  const result = sendMessage(usuario.telefone);
  if (result) return resp;
  else throw new Error("Erro durante confirmação de compra.");
};
