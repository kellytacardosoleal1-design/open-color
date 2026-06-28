const openColor = require("./open-color.js");

describe("Testes de integridade do arquivo open-color.js", () => {
  test("Deve exportar um objeto válido com a estrutura do Tailwind/Theme", () => {
    // Garante que o arquivo exportou um objeto
    expect(openColor).toBeDefined();
    expect(typeof openColor).toBe("object");

    // Valida a existência do nó principal de cores
    expect(openColor.theme).toBeDefined();
    expect(openColor.theme.colors).toBeDefined();
  });

  test("Deve conter as cores hexadecimais básicas corretas", () => {
    const { colors } = openColor.theme;

    // Valida se as cores estáticas principais estão presentes
    expect(colors.white).toBe("#ffffff");
    expect(colors.black).toBe("#000000");
  });

  test("Deve conter as escalas de cores numéricas de 50 a 900", () => {
    const { colors } = openColor.theme;

    // Testa algumas amostras de paletas para forçar a leitura do arquivo inteiro pelo Jest
    expect(colors.gray["50"]).toBe("#f8f9fa");
    expect(colors.gray["900"]).toBe("#212529");

    expect(colors.red["50"]).toBe("#fff5f5");
    expect(colors.red["900"]).toBe("#c92a2a");

    expect(colors.blue["50"]).toBe("#e7f5ff");
    expect(colors.blue["900"]).toBe("#1864ab");

    expect(colors.orange["50"]).toBe("#fff4e6");
    expect(colors.orange["900"]).toBe("#d9480f");
  });

  test("Deve conter a propriedade de plugins vazia como no arquivo original", () => {
    expect(Array.isArray(openColor.plugins)).toBe(true);
    expect(openColor.plugins.length).toBe(0);
  });
});
