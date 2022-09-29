const produtoService = require("../services/produtosService");

module.exports = (server) => {
  server
    .route("/produtos")
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          res.json(await produtoService.getProdutosById(req.query.id));
        } catch (error) {
          res.status(404).send(error.message);
        }
      } else res.json(await produtoService.getProdutos());
    })
    .post(async (req, res) => {
      const { descricao, preco, tipo_produto, provedor_id } = req.body;
      try {
        const resp = await produtoService.insertProduto({
          descricao,
          preco,
          tipo_produto,
          provedor_id,
        });
        res.status(201).json({
          data: `Cadastro de id ${resp[0].id} efetuado com sucesso!!!`,
          id: resp[0].id,
        });
      } catch (error) {
        res.status(422).send(error.message);
      }
    })
    .put(async (req, res) => {
      const { id, descricao, preco, tipo_produto, provedor_id } = req.body;
      res.json(
        await produtoService.updateProduto(id, {
          descricao,
          preco,
          tipo_produto,
          provedor_id,
        })
      );
    })
    .delete(async (req, res) => {
      try {
        res.json(await produtoService.deleteProduto(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
