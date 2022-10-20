require("dotenv").config();
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hoshi API",
      version: "0.1.0",
      description: "API para o e-commerce da Hoshi",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Gustavo Vieira",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development Server",
      },
      {
        url: "https://hoshi-api.herokuapp.com/",
        description: "Production Server",
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

server.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

// Export the Express API
module.exports = server;
