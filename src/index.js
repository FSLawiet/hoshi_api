require("dotenv").config();
const express = require("express");

const server = express();
const port = process.env.PORT || 3000;

const cupomRoute = require("./routes/cuponsRoute");
const produtoRoute = require("./routes/produtoRoute");
const usuarioRoute = require("./routes/usuarioRoute");
server.use(express.json());
cupomRoute(server);
produtoRoute(server);
usuarioRoute(server);
server.get("/", (req, res) => {
  res.send("API funfando!");
});
//res.status(404).send("Rota não encontrada!");
server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});
