const usuarioService = require("../services/usuarioService");

module.exports = (server) => {
  server
    .route("/users")
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
    .post(async (req, res) => {
      const { nome, username, senha, email, telefone } = req.body;
      await usuarioService
        .insertUsuario({
          nome,
          username,
          senha,
          email,
          telefone,
        })
        .then((resp) => {
          console.log(resp);
          res.status(201).json({
            data: `Cadastro de id ${resp[0].id} efetuado com sucesso!!!`,
            id: resp[0].id,
          });
        })
        .catch((error) => {
          console.log("ERRO!: " + error.message);
          res.status(422).send(error.message);
        })
        .finally(() => {
          console.log("Obrigado por usar a API da HOSHI!");
        });
    })
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
    .delete(async (req, res) => {
      try {
        res.json(await usuarioService.deleteUsuario(req.body.id));
      } catch (error) {
        res.status(422).send(error.message);
      }
    });
};
