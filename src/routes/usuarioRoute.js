/**
 * @openapi
 *   components:
 *     schemas:
 *       Usuário:
 *         type: object
 *         required:
 *           - id
 *           - nome
 *           - username
 *           - senha
 *           - email
 *           - telefone
 *           - enderecos
 *         properties:
 *           id:
 *             type: integer
 *             description: O identificador único do usuário.
 *           nome:
 *             type: string
 *             description: Nome do usuário.
 *           username:
 *             type: string
 *             description: Nome do usuário no sistema.
 *           email:
 *             type: string
 *             description: E-mail do usuário.
 *           telefone:
 *             type: string
 *             description: Telefone do usuário.
 *           enderecos:
 *             type: array
 *             items:
 *               type: object
 *               description: Endereço do usuário.
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de um endereço.
 *                 nome:
 *                   type: string
 *                   description: Nome do responsável pelo endereço.
 *                 apelido:
 *                   type: string
 *                   description: Identificador informal de um endereço.
 *                 rua:
 *                   type: string
 *                   description: Rua do endereço.
 *                 numero:
 *                   type: integer
 *                   description: Número do endereço.
 *                 bairro:
 *                   type: string
 *                   description: Bairro do endereço.
 *                 cidade:
 *                   type: string
 *                   description: Cidade do endereço.
 *                 estado:
 *                   type: string
 *                   description: Estado do endereço.
 *                 cep:
 *                   type: string
 *                   description: CEP do endereço.
 *
 * @openapi
 * tags:
 *   name: Usuários
 *   description: API para os usuários da HOSHI
 */

const usuarioService = require("../services/usuarioService");

module.exports = (server) => {
  server
    .route("/users")
    /**
     * @openapi
     * /users:
     *   get:
     *     tags: [Usuários]
     *     summary: Listagem Usuários
     *     description: Listagem completa de usuários.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Usuário'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    /**
     * @openapi
     * /users?id={id}:
     *   get:
     *     tags: [Usuários]
     *     summary: Listagem Usuário
     *     description: Listagem de usuário por identificador único.
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
     *               $ref: '#/components/schemas/Usuário'
     *       404:
     *         description: Uma resposta mal-suscedida.
     */
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await usuarioService.getUsuariosById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else {
        try {
          res.json(await usuarioService.getUsuarios());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
    /**
     * @openapi
     *   /users:
     *     post:
     *       tags: [Usuários]
     *       summary: Inserção Usuário
     *       description: Cadastro de um usuário.
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
      const { nome, username, senha, email, telefone } = req.body;
      try {
        const resp = await usuarioService.insertUsuario({
          nome,
          username,
          senha,
          email,
          telefone,
        });
        console.log(resp);
        res.status(201).json({
          data: `Cadastro de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        console.log("ERRO!: " + error.message);
        res.status(422).send(error.message);
      }
      /*.finally(() => {
          console.log("Obrigado por usar a API da HOSHI!");
        });*/
    })
    /**
     * @openapi
     * /users:
     *   put:
     *     tags: [Usuários]
     *     summary: Alteração Usuário
     *     description: Alteração de dados de um usuário por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .put(async (req, res) => {
      const { id, nome, username, senha, email, telefone } = req.body;
      res.json(
        await usuarioService.updateUsuario(id, {
          nome,
          username,
          senha,
          email,
          telefone,
        })
      );
    })
    /**
     * @openapi
     * /users:
     *   delete:
     *     tags: [Usuários]
     *     summary: Exclusão Usuário
     *     description: Exclusão de um usuário por identificador único.
     *     responses:
     *       200:
     *         description: Uma resposta bem-suscedida.
     *       422:
     *         description: Uma resposta mal-suscedida.
     */
    .delete(async (req, res) => {
      try {
        res.json(await usuarioService.deleteUsuario(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
