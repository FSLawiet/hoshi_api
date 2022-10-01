class Endereço {
  constructor(id, nome, apelido, rua, numero, bairro, cidade, estado, cep) {
    this.id = id;
    this.nome = nome;
    this.apelido = apelido;
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}
module.exports = Endereço;
