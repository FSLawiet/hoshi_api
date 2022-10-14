const cupomService = require("../services/cuponsService");

module.exports = (server) => {
  server
    .route("/cupons")
/**
  * @openapi
  * /cupons:
  *   get:
  *     summary: Listagem Cupons
  *     description: Listagem de cupons, podendo ser listagem completa, ou por identificador único.
  *     responses:
  *       '200':
  *         description: Uma resposta bem-suscedida.
  *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: O identificador único do cupom.
 *                         example: 1
 *                       codigo:
 *                         type: string
 *                         description: O código do cupom.
 *                         example: cupom15
 *                       desconto:
 *                         type: float
 *                         description: A porcentagem de desconto do cupom em valores decimais.
 *                         example: 0.15
 *                       validade:
 *                         type: date
 *                         description: Data de validade do cupom.
 *                         example: 2022-12-31T03:00:00.000Z
 */
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await cupomService.getCuponsById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.json(await cupomService.getCupons());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
  /**
   * @openapi
   *   /cupons:
   *     post:
   *       summary: Inserção Cupom
   *       description: Cadastro de um cupom.
   *       responses:
   *         200:
   *           description: Uma resposta bem-suscedida.
  */
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
  /**
   * @openapi
   * /cupons:
   *   put:
   *     description: Alteração de dados de um cupom por identificador único.
   *     responses:
   *       '200':
   *         description: Uma resposta bem-suscedida.
  */
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
/**
 * @openapi
 * /cupons:
 *   delete:
 *     description: Exclusão de um cupom por identificador único.
 *     responses:
 *       200:
 *         description: Uma resposta bem-suscedida.
 */
    .delete(async (req, res) => {
      try {
        res.json(await cupomService.deleteCupom(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
