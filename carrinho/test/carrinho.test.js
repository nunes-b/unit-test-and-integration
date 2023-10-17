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
});
