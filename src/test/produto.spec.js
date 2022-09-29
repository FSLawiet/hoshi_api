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
          descricao: "Teste",
          preco: 0.99,
          tipo_produto: "Tipo Teste",
          provedor_id: 1,
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
      expect(response.data[0].id).toBe(id);
    });
  });
  describe("2.3 Alteração de Produtos", () => {
    it("Alteração de um produto com id igual ao do objeto inserido", async () => {
      const response = await axios({
        url: "http://localhost:3000/produtos",
        method: "put",
        data: {
          id,
          descricao: "Teste Alterado",
          preco: 1.99,
          tipo_produto: "Tipo Teste Alterado",
          provedor_id: 1,
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

/*
Os testes funcionais têm como foco os requisitos
de negócios de uma aplicação. Eles só verificam
a saída de uma ação e não verificam os estados
intermediários do sistema ao executar essa ação.
Às vezes há uma confusão entre testes de integração
e testes funcionais, uma vez que ambos exigem vários
componentes para interagirem entre si. A diferença
é que um teste de integração pode simplesmente verificar
que você pode consultar o banco de dados, enquanto um
teste funcional esperaria obter um valor específico do
banco de dados conforme definido pelos requisitos do
produto.

  it("O preço do terceiro produto deve ser R$ 2,99", async () => {
    const response = await axios({
      url: "http://localhost:3000/produtos",
      method: "get",
    });

    const resposta = response.data;
    const preco = resposta[2].preco;
    expect(preco).toBe("R$ 2,99");
  });
*/
