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
      } else {
        try {
          res.json(await produtoService.getProdutos());
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
    })
    .post(async (req, res) => {
      const { peca, valor, qt_estoque } = req.body;
      try {
        const resp = await produtoService.insertProduto({
          peca,
          valor,
          qt_estoque,
        });
        res.status(201).json({
          data: `Cadastro de id ${resp[0].id_produto} efetuado com sucesso!!!`,
          id: resp[0].id_produto,
        });
      } catch (error) {
        console.log(error.message);
        res.status(422).send(error.message);
      }
    })
    .put(async (req, res) => {
      const { id, peca, valor, qt_estoque } = req.body;
      res.json(
        await produtoService.updateProduto(id, {
          peca,
          valor,
          qt_estoque,
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
