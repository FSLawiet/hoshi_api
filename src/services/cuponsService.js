const { Cupom } = require("../models/cupom");
const cuponsData = require("../data/cuponsData");

exports.getCupons = () => {
  return cuponsData.getCupons();
};
exports.getCuponsById = (id) => {
  if (id === NaN) throw new Error("Erro na requisição de cupom.");
  else return cuponsData.getCuponsById(id);
};
exports.insertCupom = (c) => {
  if (!c.codigo) throw new Error("Código do cupom não informado.");
  else if (!c.desconto)
    throw new Error("Porcentagem de desconto do cupom não informada.");
  else if (!c.validade)
    throw new Error("Data de validade do cupom não informada.");
  else {
    return cuponsData.insertCupom(c);
  }
};
exports.updateCupom = (id, cupom) => {
  return cuponsData.updateCupom(id, cupom);
};
exports.deleteCupom = (id) => {
  if (id === NaN) throw new Error("Erro na exclusão de cupom.");
  else return cuponsData.deleteCupom(id);
};
