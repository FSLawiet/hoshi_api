const { Produto } = require("../models/produto");
const produtosData = require("../data/produtosData");
//const sendMessage = require("../lib/twilio");

exports.getProdutos = async () => {
  return await produtosData.getProdutos();
};
exports.getProdutosById = async (id) => {
  if (id === NaN) throw new Error("Erro na requisição de produto.");
  else return await produtosData.getProdutosById(id);
};
exports.insertProduto = async (produto) => {
  if (!produto.peca) throw new Error("Peça de produto não informada.");
  else if (!produto.img) throw new Error("Imagem do produto não informada");
  else if (!produto.valor) throw new Error("Preço de produto não informado.");
  else if (!produto.qt_estoque)
    throw new Error("Quantidade do produto no estoque não informada.");
  else {
    //let id = produtosData.insertProduto(produto);
    //await sendMessage(this.getProdutosById(id).phone);
    //return id;
    return await produtosData.insertProduto(produto);
  }
};
exports.updateProduto = async (id, produto) => {
  return await produtosData.updateProduto(id, produto);
};
exports.deleteProduto = async (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de produto.");
  else return await produtosData.deleteProduto(id);
};
