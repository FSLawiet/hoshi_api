const { default: axios } = require("axios");
let id;

describe("2. Testes de Integração de Cupons", () => {
  /* 
      Testes de integração verificam se diferentes módulos ou serviços usados
      pelo seu aplicativo funcionam bem juntos. Por exemplo, pode ser testar a
      interação com o banco de dados ou garantir que os microsserviços funcionem
      juntos conforme o esperado. A execução desses tipos de testes tem um custo
      maior, uma vez que exigem que várias partes do aplicativo estejam ativas
      e em execução.
    */

  describe("2.1 Inserção de Cupons", () => {
    it("Deve inserir um cupom no banco de dados", async () => {
      const response = await axios({
        url: "http://localhost:3000/cupons",
        method: "post",
        data: {
          codigo: "cupom10",
          desconto: 0.1,
          validade: "31.12.2022",
        },
      });
      id = response.data.id;
      expect(response.status).toEqual(201);
    });
  });
  describe("2.2 Requisição de Cupons", () => {
    it("Requisição de todos os cupons do banco de dados", async () => {
      const response = await axios({
        url: "http://localhost:3000/cupons",
        method: "get",
      });

      expect(response.status).toEqual(200);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it("Requisição de um cupom com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/cupons?id=" + id,
        method: "get",
      });

      expect(response.status).toEqual(200);
      expect(response.data[0].id).toBe(id);
    });
  });
  describe("2.3 Alteração de Cupons", () => {
    it("Alteração de um cupom com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/cupons",
        method: "put",
        data: {
          id,
          codigo: "cupom20",
          desconto: 0.2,
          validade: "30.12.2022",
        },
      });
      expect(response.status).toEqual(200);
    });
  });
  describe("2.4 Exclusão de Cupons", () => {
    it("Exclusão de um cupom com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/cupons",
        method: "delete",
        data: { id },
      });
      expect(response.status).toEqual(200);
    });
  });
});
