const { Produto } = require("../models/produto");
const produtosData = require("../data/produtosData");
//const sendMessage = require("../lib/twilio");

exports.getProdutos = () => {
  return produtosData.getProdutos();
};
exports.getProdutosById = (id) => {
  if (id === NaN) throw new Error("Erro na requisição de produto.");
  else return produtosData.getProdutosById(id);
};
exports.insertProduto = (produto) => {
  if (!produto.peca) throw new Error("Peça de produto não informada.");
  else if (!produto.img) throw new Error("Imagem do produto não informada");
  else if (!produto.valor) throw new Error("Preço de produto não informado.");
  else if (!produto.qt_estoque)
    throw new Error("Quantidade do produto no estoque não informada.");
  else {
    //let id = produtosData.insertProduto(produto);
    //await sendMessage(this.getProdutosById(id).phone);
    //return id;
    return produtosData.insertProduto(produto);
  }
};
exports.updateProduto = (id, produto) => {
  return produtosData.updateProduto(id, produto);
};
exports.deleteProduto = (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de produto.");
  else return produtosData.deleteProduto(id);
};
