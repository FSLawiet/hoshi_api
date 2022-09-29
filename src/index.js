require("dotenv").config();
const express = require("express");

const server = express();
const port = process.env.PORT || 3000;

const produtoRoute = require("./routes/produtoRoute");
server.use(express.json());
produtoRoute(server);
server.get("/", (req, res) => {
  res.send("API funfando!");
});
server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});
