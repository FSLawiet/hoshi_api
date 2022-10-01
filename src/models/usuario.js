class Usuario {
  constructor(id, username, senha, email, telefone, endereços) {
    this.id = id;
    this.username = username;
    this.senha = senha;
    this.email = email;
    this.telefone = telefone;
    this.endereços = endereços;
  }
}
module.exports = Usuario;
