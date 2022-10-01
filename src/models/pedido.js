class Pedido {
  constructor(
    id,
    id_frete,
    id_pagamento,
    id_cupom = null,
    produtos,
    usuario,
    id_endereço,
    obs
  ) {
    this.id = id;
    this.id_frete = id_frete;
    this.id_pagamento = id_pagamento;
    this.id_cupom = id_cupom;
    this.produtos = produtos;
    this.usuario = usuario;
    this.id_endereço = id_endereço;
    this.obs = obs;
  }

  getEndereço = () => {
    this.usuario.endereços.map((endereço) => {
      if (endereço.id === this.id_endereço) return endereço;
    });
  };
}
module.exports = Pedido;
