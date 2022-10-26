/**
 * @openapi
 *   components:
 *     schemas:
 *       Produto:
 *         type: object
 *         required:
 *           - id
 *           - peca
 *           - img
 *           - valor
 *           - quantidade_estoque
 *           - categorias
 *         properties:
 *           id:
 *             type: integer
 *             description: O identificador único do produto.
 *           peca:
 *             type: string
 *             description: Descrição do produto.
 *           img:
 *             type: string
 *             descripton: Imagem do produto codificada em base64.
 *           valor:
 *             type: integer
 *             description: Preço do produto.
 *           quantidade_estoque:
 *             type: integer
 *             description: Quantidade de produtos remanescentes em estoque.
 *           categorias:
 *             type: array
 *             items:
 *               type: object
 *               description: Categoria do produto
 *               properties:
 *                 codigo:
 *                   type: string
 *                   description: Codigo da categoria de produto.
 *                 descricao:
 *                   type: string
 *                   description: Descrição da categoria de produto.
 * @openapi
 * tags:
 *   name: Produtos
 *   description: API para os produtos da HOSHI
 */

const produtoService = require("../services/produtosService");

module.exports = (server) => {
  server
    .route("/produtos")
    /**
     * @openapi
     * /produtos:
     *   get:
     *     tags: [Produtos]
     *     summary: Listagem Produtos
     *     description: Listagem completa de produtos.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Produto'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    /**
     * @openapi
     * /produtos?id={id}:
     *   get:
     *     tags: [Produtos]
     *     summary: Listagem Produto
     *     description: Listagem de produto por identificador único.
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
     *               $ref: '#/components/schemas/Produto'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await produtoService.getProdutosById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.json(await produtoService.getProdutos());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
    /**
     * @openapi
     *   /produtos:
     *     post:
     *       tags: [Produtos]
     *       summary: Inserção Produto
     *       description: Cadastro de um Produto.
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
      const { peca, img, valor, qt_estoque } = req.body;

      try {
        const resp = await produtoService.insertProduto({
          peca,
          img,
          valor,
          qt_estoque,
        });
        res.status(201).json({
          data: `Cadastro de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        console.log(error.message);
        res.status(422).send(error.message);
      }
    })
    /**
     * @openapi
     * /produtos:
     *   put:
     *     tags: [Produtos]
     *     summary: Alteração Produto
     *     description: Alteração de dados de um produto por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .put(async (req, res) => {
      const { id, peca, img, valor, qt_estoque } = req.body;
      res.json(
        await produtoService.updateProduto(id, {
          peca,
          img,
          valor,
          qt_estoque,
        })
      );
    })
    /**
     * @openapi
     * /produtos:
     *   delete:
     *     tags: [Produtos]
     *     summary: Exclusão Produto
     *     description: Exclusão de um produto por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .delete(async (req, res) => {
      try {
        res.json(await produtoService.deleteProduto(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
