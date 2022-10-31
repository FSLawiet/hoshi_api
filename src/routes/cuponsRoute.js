/**
 * @openapi
 *   components:
 *     schemas:
 *       Cupom:
 *         type: object
 *         required:
 *           - id
 *           - codigo
 *           - desconto
 *           - validade
 *         properties:
 *           id:
 *             type: integer
 *             description: O identificador único do cupom.
 *           codigo:
 *             type: string
 *             description: O código do cupom.
 *           desconto:
 *             type: integer
 *             description: A porcentagem de desconto do cupom em valores decimais.
 *           validade:
 *             type: date
 *             description: Data de validade do cupom.
 *         examples:
 *           id: 1
 *           codigo: cupom15
 *           desconto: 0.15
 *           validade: 2022-12-31T03:00:00.000Z
 *
 * @openapi
 * tags:
 *   name: Cupons
 *   description: API para os cupons de desconto da HOSHI
 */

const cupomService = require("../services/cuponsService");

module.exports = (server) => {
  server
    .route("/cupons")
    /**
     * @openapi
     * /cupons:
     *   get:
     *     tags: [Cupons]
     *     summary: Listagem Cupons
     *     description: Listagem completa de cupons.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Cupom'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    /**
     * @openapi
     * /cupons?id={id}:
     *   get:
     *     tags: [Cupons]
     *     summary: Listagem Cupom
     *     description: Listagem de cupom por identificador único.
     *     parameters:
     *       - in: query
     *         name: id
     *         schema:
     *           type: integer
     *         description: Identificador único.
     *         required: true
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cupom'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.status(200).json(await cupomService.getCuponsById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.status(200).json(await cupomService.getCupons());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
    /**
     * @openapi
     *   /cupons:
     *     post:
     *       tags: [Cupons]
     *       summary: Inserção Cupom
     *       description: Cadastro de um cupom.
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 codigo:
     *                   type: string
     *                   description: O código do cupom.
     *                   example: cupom15
     *                 desconto:
     *                   type: integer
     *                   description: A porcentagem de desconto do cupom em valores decimais.
     *                   example: 0.15
     *                 validade:
     *                   type: date
     *                   description: Data de validade do cupom.
     *                   example: 2022-12-31T03:00:00.000Z
     *       responses:
     *         201:
     *           description: Uma resposta bem-suscedida.
     *         422:
     *           description: Uma resposta mal-suscedida.
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
     *     tags: [Cupons]
     *     summary: Alteração Cupom
     *     description: Alteração de dados de um cupom por identificador único.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: Identificador único do cupom a ser alterado
     *                 example: 1
     *               codigo:
     *                 type: string
     *                 description: O código do cupom.
     *                 example: cupom15
     *               desconto:
     *                 type: integer
     *                 description: A porcentagem de desconto do cupom em valores decimais.
     *                 example: 0.15
     *               validade:
     *                 type: date
     *                 description: Data de validade do cupom.
     *                 example: 2022-12-31T03:00:00.000Z
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
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
     *     tags: [Cupons]
     *     summary: Exclusão Cupom
     *     description: Exclusão de um cupom por identificador único.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: Identificador único do cupom a ser excluído
     *                 example: 1
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .delete(async (req, res) => {
      try {
        res.json(await cupomService.deleteCupom(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
