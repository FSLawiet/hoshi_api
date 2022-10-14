const pedidosService = require("../services/pedidosService");

module.exports = (server) => {
  server
    .route("/pedidos")
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await pedidosService.getPedidosById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else if (req.query.user) {
        try {
          res.json(await pedidosService.getPedidosByUserId(req.query.user));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.json(await pedidosService.getPedidos());
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
          data: `Cadastro do pedido de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        res.status(422).send(error.message);
      }
    })
    .put((req, res) => {})
    .delete((req, res) => {});
};
