/**
 * @openapi
 *   components:
 *     schemas:
 *       Pedidos:
 *         type: object
 *         required:
 *           - id
 *           - usuario
 *           - frete
 *           - pagamento
 *           - id_endereco
 *           - desconto
 *           - obs
 *           - produtos
 *         properties:
 *           id:
 *             type: integer
 *             description: Identificador único do pedido.
 *           usuario:
 *             type: integer
 *             description: Referência ao identificador único do usuário.
 *           frete:
 *             type: integer
 *             description: Identificador único da forma de envio.
 *           pagamento:
 *             type: integer
 *             description: Identificador único da forma de pagamento.
 *           id_endereco:
 *             type: integer
 *             description: Identificador único do endereço para envio.
 *           desconto:
 *             type: integer
 *             description: Valor do desconto aplicado à compra.
 *           obs:
 *             type: string
 *             description: Observações adicionais ao pedido.
 *           produtos:
 *             type: array
 *             items:
 *               Produto:
 *               type: object
 *               properties:
 *                 produto:
 *                   type: integer
 *                   description: Identificador único do produto.
 *                 tamanho:
 *                   type: string
 *                   description: Tamanho do produto.
 *
 * @openapi
 * tags:
 *   name: Pedidos
 *   description: API para os pedidos da HOSHI
 */

/*
  
*/

const pedidosService = require("../services/pedidosService");

module.exports = (server) => {
  server
    .route("/pedidos")
    /**
     * @openapi
     * /pedidos:
     *   get:
     *     tags: [Pedidos]
     *     summary: Listagem Pedidos
     *     description: Listagem completa de pedidos.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Pedidos'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    /**
     * @openapi
     * /pedidos?id={id}:
     *   get:
     *     tags: [Pedidos]
     *     summary: Listagem Pedido
     *     description: Listagem de pedido por identificador único.
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
     *               $ref: '#/components/schemas/Pedidos'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    /**
     * @openapi
     * /pedidos?user={user}:
     *   get:
     *     tags: [Pedidos]
     *     summary: Listagem Pedido
     *     description: Listagem de pedido por usuário.
     *     parameters:
     *       - in: query
     *         name: user
     *         schema:
     *           type: integer
     *         description: Usuário autor do pedido.
     *         required: true
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Pedidos'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
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
    /**
     * @openapi
     *   /pedidos:
     *     post:
     *       tags: [Pedidos]
     *       summary: Inserção Pedido
     *       description: Cadastro de um Pedido.
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
    /**
     * @openapi
     * /pedidos:
     *   put:
     *     tags: [Pedidos]
     *     summary: Alteração Pedido
     *     description: Alteração de dados de um pedido por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .put((req, res) => {})
    /**
     * @openapi
     * /pedidos:
     *   delete:
     *     tags: [Pedidos]
     *     summary: Exclusão Pedido
     *     description: Exclusão de um pedido por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .delete((req, res) => {});
};
