const database = require("../infra/connection");

// Requisita todos os produtos do banco de dados, juntamente com as categorias em um array
exports.getProdutos = async () => {
  let resp = await database.query(
    "SELECT id, peca, encode(img, 'base64') AS img, valor, quantidade_estoque FROM produtos;"
  );
  let produtos = [];
  for (produto of resp) {
    let categorias = await database.query(
      "SELECT codigo, descricao FROM categorias, categorias_produtos WHERE categorias.id = categorias_produtos.categoria AND categorias_produtos.produto = " +
        produto.id +
        ";"
    );
    produtos.push({ ...produto, categorias: categorias });
  }
  return produtos;
};
// Requisita um produto do banco de dados por ID único, juntamente com as categorias em um array
exports.getProdutosById = async (id) => {
  const resp = await database.one(
    `SELECT id, peca, encode(img, 'base64') AS img, valor, quantidade_estoque FROM produtos WHERE id = '${id}';`
  );
  const categorias = await database.query(
    "SELECT codigo, descricao FROM categorias, categorias_produtos WHERE categorias.id = categorias_produtos.categoria AND categorias_produtos.produto = " +
      resp.id +
      ";"
  );
  return { ...resp, categorias };
};
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
