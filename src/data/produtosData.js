const database = require("../infra/connection");

exports.getProdutos = () => database.query("SELECT * FROM produto");
exports.getProdutosById = (id) =>
  database.query(`SELECT * FROM produto WHERE id = '${id}';`);
exports.getProdutosByProvedorId = (provedor_id) =>
  database.query(`SELECT * FROM produto WHERE provedor_id = '${provedor_id}';`);
exports.insertProduto = (produto) =>
  database.query(
    `INSERT INTO produto (descricao, preco, tipo_produto, provedor_id) VALUES ('${produto.descricao}', ${produto.preco}, '${produto.tipo_produto}', ${produto.provedor_id}) RETURNING id;`
  );
exports.updateProduto = (id, produto) => {
  let valores = Object.values(produto);
  let valueChange = "";
  if (valores.length > 1) {
    for (let i = 0; i < valores.length; i++) {
      if (produto.descricao && produto.descricao === valores[i])
        valueChange += "descricao = '" + produto.descricao + "'";
      else if (produto.preco && produto.preco === valores[i])
        valueChange += "preco = " + produto.preco;
      else if (produto.tipo_produto && produto.tipo_produto === valores[i])
        valueChange += "tipo_produto = '" + produto.tipo_produto + "'";
      else if (produto.provedor_id && produto.provedor_id === valores[i])
        valueChange += "provedor_id = " + produto.provedor_id;

      if (i !== valores.length - 1) valueChange += ", ";
    }
  } else {
    let valueChange = "";
    if (produto.descricao) valueChange += "descricao = " + produto.descricao;
    else if (produto.preco) valueChange += "preco = " + produto.preco;
    else if (produto.tipo_produto)
      valueChange += "tipo_produto = " + produto.tipo_produto;
    else if (produto.provedor_id)
      valueChange += "provedor_id = " + produto.provedor_id;
  }
  database.query(
    `UPDATE produto SET ${valueChange} WHERE id = ${id} RETURNING id;`
  );
};
exports.deleteProduto = (id) => {
  database.query(`DELETE FROM produto WHERE id = ${id};`);
};
