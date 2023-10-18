import Editora from "../../models/editora";
import { expect, jest, test } from "@jest/globals";

describe("Testando o modelo editora", () => {
  const objetoEditora = {
    nome: "Justiça Brasil",
    cidade: "Rio de Janeiro",
    email: "editora@editora.com.br",
  };

  it("Deve criar uma instancia de editora", () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it.skip("Deve salvar editora no DB", () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe(objetoEditora.nome);
    });
  });

  it.skip("Deve salvar no BD usando a sintaxe moderna", async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it("Deve criar uma chamada simulada no bd", () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 22,
      nome: "Justiça Brasil",
      cidade: "Rio de Janeiro",
      email: "editora@editora.com.br",
      created_at: "2022-10-01",
      updated_at: "2022-10-01",
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });
});
