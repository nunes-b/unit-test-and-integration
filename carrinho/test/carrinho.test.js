import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testando o carrinho de compras", () => {
  it("Deve inicializar com o  carrinho vazio", () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull;
  });

  it("Deve guardar os itens dentro do carrinho", () => {
    const item = new Item("Banana", 2, 5);
    const item2 = new Item("Uva", 0.5, 1);
    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe("object");
    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
  });

  it("Deve ter a propriedade total na inicialização", () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty("total");
  });

  it("Deve lançar um erro ao finalizar compra com carrinho vazio", () => {
    function capturaErro() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }

    expect(capturaErro).toThrowError("Carrinho de compras vazio");
  });

  it("Deve adicionar o frete", () => {
    const carrinho = new Carrinho();
    const valor = 100;
    carrinho.adicionaFrete(valor);

    expect(carrinho.frete).toBe(valor);
  });

  it("Deve finalizar as compras", () => {
    const valor = 2;
    const quantidade = 1;
    const frete = 5;
    const somaDosValores = quantidade * valor;
    const total = somaDosValores + frete;
    const item = new Item("Banana", valor, quantidade);
    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adicionaFrete(frete);

    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: somaDosValores,
      frete: frete,
      total: total,
    });
  });
});
