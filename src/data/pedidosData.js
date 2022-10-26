const database = require("../infra/connection");

exports.getPedidos = async () => {
  const resp = await database.query("SELECT * FROM pedidos;");
  let pedidos = [];
  for (pedido of resp) {
    const lista = await database.query(
      "SELECT produto, tamanho FROM pedidos_produtos WHERE pedido = " +
        pedido.id +
        ";"
    );
    pedidos.push({ ...pedido, produtos: lista });
  }
  return pedidos;
};
exports.getPedidosById = async (id) => {
  const resp = await database.one(
    "SELECT * FROM pedidos WHERE id = " + id + ";"
  );
  const lista = await database.query(
    "SELECT * FROM pedidos_produtos WHERE pedido = " + resp.id + ";"
  );
  return { ...resp, produtos: lista };
};
exports.getPedidosByUserId = async (usuario) => {
  const resp = await database.one(
    "SELECT * FROM pedidos WHERE usuario = " + usuario + ";"
  );
  const lista = await database.query(
    "SELECT * FROM pedidos_produtos WHERE pedido = " + resp.id + ";"
  );
  return { ...resp, produtos: lista };
};
exports.insertPedidos = async (pedido) => {
  const resp = await database.query(
    `INSERT INTO pedidos (usuario, frete, pagamento, id_endereco, desconto, obs) VALUES (${pedido.usuario}, ${pedido.forma_envio}, ${pedido.forma_pagamento}, ${pedido.adr_id}, ${pedido.desconto}, '${pedido.obs}') RETURNING id;`
  );
  await pedido.produtos.map(async (produto) => {
    await database.query(
      `INSERT INTO pedidos_produtos (pedido, produto, tamanho) VALUES (${resp[0].id}, ${produto.produto}, '${produto.tamanho}');`
    );
  });
  return resp;
};
exports.updatePedido = (id, pedido) => {};
exports.deletePedido = (id) => {};
