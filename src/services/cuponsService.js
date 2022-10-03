const { Cupom } = require("../models/cupom");
const cuponsData = require("../data/cuponsData");

exports.getCupons = async () => {
  return await cuponsData.getCupons();
};
exports.getCuponsById = async (id) => {
  if (id === NaN) throw new Error("Erro na requisição de cupom.");
  else return await cuponsData.getCuponsById(id);
};
exports.insertCupom = async (c) => {
  if (!c.codigo) throw new Error("Código do cupom não informado.");
  else if (!c.desconto)
    throw new Error("Porcentagem de desconto do cupom não informada.");
  else if (!c.validade)
    throw new Error("Data de validade do cupom não informada.");
  else {
    return await cuponsData.insertCupom(c);
  }
};
exports.updateCupom = async (id, cupom) => {
  return await cuponsData.updateCupom(id, cupom);
};
exports.deleteCupom = async (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de cupom.");
  else return await cuponsData.deleteCupom(id);
};
