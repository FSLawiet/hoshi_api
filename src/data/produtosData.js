const database = require("../infra/connection");

exports.getProdutos = () => database.query("SELECT * FROM produtos");
exports.getProdutosById = (id) =>
  database.query(`SELECT * FROM produtos WHERE id_produto = '${id}';`);
exports.insertProduto = (produto) =>
  database.query(
    `INSERT INTO produtos (peca, valor, quantidade_estoque) VALUES ('${produto.peca}', ${produto.valor}, ${produto.qt_estoque}) RETURNING id_produto;`
  );
exports.updateProduto = (id, produto) => {
  let valores = Object.values(produto);
  let valueChange = "";
  if (valores.length > 1) {
    for (let i = 0; i < valores.length; i++) {
      if (produto.peca && produto.peca === valores[i])
        valueChange += "peca = '" + produto.peca + "'";
      else if (produto.valor && produto.valor === valores[i])
        valueChange += "valor = " + produto.valor;
      else if (produto.qt_estoque && produto.qt_estoque === valores[i])
        valueChange += "quantidade_estoque = " + produto.qt_estoque;

      if (i !== valores.length - 1) valueChange += ", ";
    }
  } else {
    let valueChange = "";
    if (produto.peca) valueChange += "peca = '" + produto.peca + "'";
    else if (produto.valor) valueChange += "valor = " + produto.valor;
    else if (produto.qt_estoque)
      valueChange += "quantidade_estoque = " + produto.qt_estoque;
  }
  database.query(
    `UPDATE produtos SET ${valueChange} WHERE id_produto = ${id} RETURNING id_produto;`
  );
};
exports.deleteProduto = (id) => {
  database.query(`DELETE FROM produtos WHERE id_produto = ${id};`);
};
