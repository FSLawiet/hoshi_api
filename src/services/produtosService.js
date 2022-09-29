const produtosData = require("../data/produtosData");

exports.getProdutos = () => {
  return produtosData.getProdutos();
};
exports.getProdutosById = (id) => {
  if (id === NaN) throw new Error("Erro na requisição de produto.");
  else return produtosData.getProdutosById(id);
};
exports.insertProduto = (produto) => {
  if (!produto.descricao)
    throw new Error("Descrição de produto não informada.");
  else if (!produto.preco) throw new Error("Preço de produto não informado.");
  else if (!produto.tipo_produto)
    throw new Error("Tipo de produto não informado.");
  else if (!produto.provedor_id)
    throw new Error("Provedor do produto não informado.");
  else return produtosData.insertProduto(produto);
};
exports.updateProduto = (id, produto) => {
  return produtosData.updateProduto(id, produto);
};
exports.deleteProduto = (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de produto.");
  else return produtosData.deleteProduto(id);
};
