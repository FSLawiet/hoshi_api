require("dotenv").config();
const express = require("express");

const server = express();
const port = process.env.PORT || 3000;

const cupomRoute = require("./routes/cuponsRoute");
const pedidoRoute = require("./routes/pedidoRoute");
const produtoRoute = require("./routes/produtoRoute");
const usuarioRoute = require("./routes/usuarioRoute");
server.use(express.json());
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
cupomRoute(server);
pedidoRoute(server);
produtoRoute(server);
usuarioRoute(server);
server.get("/", (req, res) => {
  res.send("API funfando!");
});
//res.status(404).send("Rota não encontrada!");
server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});
