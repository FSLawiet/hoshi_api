const database = require("../infra/connection");

exports.getCupons = async () => await database.query("SELECT * FROM cupom");
exports.getCuponsById = async (id) =>
  await database.query(`SELECT * FROM cupom WHERE id = '${id}';`);
exports.insertCupom = async (cupom) =>
  await database.query(
    ` SET datestyle = dmy; INSERT INTO Cupom (codigo, desconto, validade) VALUES ('${cupom.codigo}', ${cupom.desconto}, '${cupom.validade}') RETURNING id;`
  );
exports.updateCupom = async (id, cupom) => {
  let valores = Object.values(cupom);
  let valueChange = "";
  if (valores.length > 1) {
    for (let i = 0; i < valores.length; i++) {
      if (cupom.codigo && cupom.codigo === valores[i])
        valueChange += "codigo = '" + cupom.codigo + "'";
      else if (cupom.desconto && cupom.desconto === valores[i])
        valueChange += "desconto = " + cupom.desconto;
      else if (cupom.validade && cupom.validade === valores[i])
        valueChange += "validade = " + cupom.validade;

      if (i !== valores.length - 1) valueChange += ", ";
    }
  } else {
    if (cupom.codigo) valueChange += "codigo = '" + cupom.codigo + "'";
    else if (cupom.desconto) valueChange += "desconto = " + cupom.desconto;
    else if (cupom.validade) valueChange += "validade = " + cupom.validade;
  }
  await database.query(
    `UPDATE Cupom SET ${valueChange} WHERE id = ${id} RETURNING id;`
  );
};
exports.deleteCupom = async (id) => {
  await database.query(`DELETE FROM Cupom WHERE id = ${id};`);
};
