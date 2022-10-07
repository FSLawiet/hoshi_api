const database = require("../infra/connection");

exports.getPedidos = () => {
  const resp = database.query("SELECT * FROM pedidos;");
  const pedidos = [];
  resp.map((pedido) => {
    const lista = database.query(
      "SELECT * FROM pedidos_produtos WHERE pedido = " + pedido.id + ";"
    );
    pedidos.push({ ...pedido, produtos: lista });
  });
  return pedidos;
};
exports.getPedidosById = (id) => {
  const resp = database.query("SELECT * FROM pedidos WHERE id = " + id + ";");
  const pedidos = [];
  resp.map((pedido) => {
    const lista = database.query(
      "SELECT * FROM pedidos_produtos WHERE pedido = " + pedido.id + ";"
    );
    pedidos.push({ ...pedido, produtos: lista });
  });
  return pedidos;
};
exports.getPedidosByUserId = (usuario) => {
  const resp = database.query(
    "SELECT * FROM pedidos WHERE usuario = " + usuario + ";"
  );
  const pedidos = [];
  resp.map((pedido) => {
    const lista = database.query(
      "SELECT * FROM pedidos_produtos WHERE pedido = " + pedido.id + ";"
    );
    pedidos.push({ ...pedido, produtos: lista });
  });
  return pedidos;
};
exports.insertPedido = (pedido) => {
  const resp = database.query(
    `INSERT INTO pedidos (usuario, frete, pagamento, id_endereco, desconto, obs) VALUES (${pedido.usuario}, ${pedido.forma_envio}, ${pedido.forma_pagamento}, ${pedido.adr_id}, ${pedido.desconto}, ${pedido.obs}) RETURNING id;`
  );
  pedido.produtos.map((produto) => {
    database.query(
      `INSERT INTO pedidos_produtos (pedido, produto) VALUES (${resp.id}, ${produto.id});`
    );
  });
  return resp;
};
exports.updatePedido = (id, pedido) => {};
exports.deletePedido = (id) => {};
