const pedidosService = require("../services/pedidosService");

module.exports = (server) => {
  server
    .route("/pedidos")
    .get((req, res) => {
      if (req.query.id) {
        try {
          res.json(pedidosService.getPedidosById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else if (req.query.user) {
        try {
          res.json(pedidosService.getPedidosByUserId(req.query.user));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.json(pedidosService.getPedidos());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
    .post(async (req, res) => {
      const {
        usuario,
        adr_id,
        forma_envio,
        obs,
        forma_pagamento,
        desconto,
        produtos,
      } = req.body;
      try {
        const resp = await pedidosService.insertPedidos({
          usuario,
          adr_id,
          forma_envio,
          obs,
          forma_pagamento,
          desconto,
          produtos,
        });
        res.status(201).json({
          data: `Cadastro do cupom de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        console.log("DEU RUIM\n" + error);
        res.status(422).send(error.message);
      }
    })
    .put((req, res) => {})
    .delete((req, res) => {});
};
