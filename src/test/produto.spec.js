const { default: axios } = require("axios");
let id;

describe("2. Testes de Integração de Produtos", () => {
  /*
    Testes de integração verificam se diferentes módulos ou serviços usados
    pelo seu aplicativo funcionam bem juntos. Por exemplo, pode ser testar a
    interação com o banco de dados ou garantir que os microsserviços funcionem
    juntos conforme o esperado. A execução desses tipos de testes tem um custo
    maior, uma vez que exigem que várias partes do aplicativo estejam ativas
    e em execução.
    */

  describe("2.1 Inserção de Produtos", () => {
    it("Deve inserir um produto no banco de dados", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos",
        method: "post",
        data: {
          peca: "Camisa astros",
          valor: "99.99",
          qt_estoque: 50,
        },
      });
      id = response.data.id;
      expect(response.status).toEqual(201);
    });
  });
  describe("2.2 Requisição de Produtos", () => {
    it("Requisição de todos os produtos do banco de dados", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos",
        method: "get",
      });

      expect(response.status).toEqual(200);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it("Requisição de um produto com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos?id=" + id,
        method: "get",
      });

      expect(response.status).toEqual(200);
      expect(response.data[0].id_produto).toBe(id);
    });
  });
  describe("2.3 Alteração de Produtos", () => {
    it("Alteração de um produto com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos",
        method: "put",
        data: {
          id,
          peca: "Camisa astral",
          valor: "89.99",
          qt_estoque: 40,
        },
      });
      expect(response.status).toEqual(200);
    });
  });
  describe("2.4 Exclusão de Produtos", () => {
    it("Exclusão de um produto com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos",
        method: "delete",
        data: { id },
      });
      expect(response.status).toEqual(200);
    });
  });
});
