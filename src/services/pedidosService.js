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
exports.insertPedidos = async (pedido) => {
  pedidosData
    .insertPedidos(pedido)
    .then((resp) => {
      console.log("PEDIDO: " + resp);
      const p = pedidosData.getPedidosById(resp[0].id);
      const usuario = usuariosData.getUsuariosById(p[0].usuario)[0];
      sendMessage(usuario.telefone)
        .then((result) => {
          if (result) return resp;
          else throw new Error("Erro durante confirmação de compra.\n" + error);
        })
        .catch((error) => console.log("AVE CREDO" + error));
    })
    .catch((e) => {
      throw new Error(e);
    });
};
