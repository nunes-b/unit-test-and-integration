import { afterEach, beforeEach, describe, expect } from "@jest/globals";
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
});

describe("Deleta uma unica editora  em /editoras/id", () => {
  it("Deve deletar uma editora", async () => {
    await request(app).delete(`/editoras/${idResposta}}`).expect(200);
  });
});

describe("Busca uma unica editora em /editoras/id", () => {
  it("Deve buscar uma unica editora", async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200);
  });
});
