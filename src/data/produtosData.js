const database = require("../infra/connection");

exports.getProdutos = () =>
  database.query(
    "SELECT id, peca, encode(img, 'base64') AS img, valor, quantidade_estoque FROM produtos"
  );
exports.getProdutosById = (id) =>
  database.query(
    `SELECT id, peca, encode(img, 'base64') AS img, valor, quantidade_estoque FROM produtos WHERE id = '${id}';`
  );
exports.insertProduto = (produto) =>
  database.query(
    `INSERT INTO produtos (peca, img, valor, quantidade_estoque) VALUES ('${produto.peca}', decode('${produto.img}', 'base64'), ${produto.valor}, ${produto.qt_estoque}) RETURNING id;`
  );
exports.updateProduto = (id, produto) => {
  let valores = Object.values(produto);
  let valueChange = "";
  if (valores.length > 1) {
    for (let i = 0; i < valores.length; i++) {
      if (produto.peca && produto.peca === valores[i])
        valueChange += "peca = '" + produto.peca + "'";
      else if (produto.img && produto.img === valores[i])
        valueChange += "img = decode('" + produto.img + "', 'base64')";
      else if (produto.valor && produto.valor === valores[i])
        valueChange += "valor = " + produto.valor;
      else if (produto.qt_estoque && produto.qt_estoque === valores[i])
        valueChange += "quantidade_estoque = " + produto.qt_estoque;

      if (i !== valores.length - 1) valueChange += ", ";
    }
  } else {
    let valueChange = "";
    if (produto.peca) valueChange += "peca = '" + produto.peca + "'";
    else if (produto.img)
      valueChange += "img = decode('" + produto.img + "', 'base64')";
    else if (produto.valor) valueChange += "valor = " + produto.valor;
    else if (produto.qt_estoque)
      valueChange += "quantidade_estoque = " + produto.qt_estoque;
  }
  database.query(
    `UPDATE produtos SET ${valueChange} WHERE id = ${id} RETURNING id;`
  );
};
exports.deleteProduto = (id) => {
  database.query(`DELETE FROM produtos WHERE id = ${id};`);
};
