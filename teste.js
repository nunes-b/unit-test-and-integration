const somaHorasExtras = (salario, horasExtras) => salario + horasExtras;

const calculaDescontos = (salario, descontos) => salario - descontos;

const veriqueSe = (valor) => {
  const assercoes = {
    ehExatamenteIgualA(esperado) {
      if (valor !== esperado) {
        // eslint-disable-next-line no-throw-literal
        throw {};
      }
    },
  };
  return assercoes;
};

const teste = (titulo, funcaoDeTeste) => {
  try {
    funcaoDeTeste();
    console.log(`${titulo} passou!`);
  } catch (err) {
    console.error(`${titulo} Não passou!`);
  }
};

teste("somaHorasExtras", () => {
  const esperado = 2500;
  const retornado = somaHorasExtras(2000, 500);
  veriqueSe(retornado).ehExatamenteIgualA(esperado);
});

// teste("somaHorasExtras", 2500, somaHorasExtras(2000, 500));

teste("calculaDesconto", () => {
  const esperado = 2200;
  const retornado = calculaDescontos(2500, 300);
  veriqueSe(retornado).ehExatamenteIgualA(esperado);
});
// teste("calculaDesconto", 2200, calculaDescontos(2500, 300));
