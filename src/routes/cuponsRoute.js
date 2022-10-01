const cupomService = require("../services/cuponsService");

module.exports = (server) => {
  server
    .route("/cupons")
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await cupomService.getCuponsById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else res.json(await cupomService.getCupons());
    })
    .post(async (req, res) => {
      const { codigo, desconto, validade } = req.body;
      try {
        const resp = await cupomService.insertCupom({
          codigo,
          desconto,
          validade,
        });
        res.status(201).json({
          data: `Cadastro do cupom de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        res.status(422).send(error.message);
      }
    })
    .put(async (req, res) => {
      const { id, codigo, desconto, validade } = req.body;
      res.json(
        await cupomService.updateCupom(id, {
          codigo,
          desconto,
          validade,
        })
      );
    })
    .delete(async (req, res) => {
      try {
        res.json(await cupomService.deleteCupom(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
