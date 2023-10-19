import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("Busca editoras em /editoras", () => {
  it("Deve retornar a lista de editoras", async () => {
    const resposta = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect(200);

    expect(resposta.body[0].email).toEqual("e@e.com");
  });
});

let idResposta;
describe("Cria uma editora em /editoras", () => {
  it("Deve adicionar uma editora", async () => {
    const resposta = await request(app)
      .post("/editoras")
      .send({
        nome: "nome",
        cidade: "cidade",
        email: "email",
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it("Deve não adicionar nada se o body for vazio", async () => {
    await request(app).post("/editoras").send({}).expect(400);
  });
});

describe("Busca uma unica editora em /editoras/id", () => {
  it("Deve buscar uma unica editora", async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200);
  });
});

describe("Altera algum campo dentro de editora em /editoras/id", () => {
  test.each([
    ["nome", { nome: "NomeTable" }],
    ["cidade", { cidade: "SP" }],
    ["email", { email: "Email@email.com" }],
  ])(`Deve atualizar %s em editora`, async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, "request");
    await requisicao
      .request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe("Deleta uma unica editora  em /editoras/id", () => {
  it("Deve deletar uma editora", async () => {
    await request(app).delete(`/editoras/${idResposta}}`).expect(200);
  });
});
