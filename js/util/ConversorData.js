/**
 * Classe ConversorData é uma classe estática para conversão de datas.
 * Ela não deve ser instanciada, mas usada diretamente pelos seus métodos estáticos.
 */
export class ConversorData {
  /**
   * Construtor da classe.
   * Lança um erro se uma tentativa de instanciar a classe for feita.
   */
  constructor() {
    throw new Error("Esta	classe	não	pode	ser	instanciada");
  }
  /**
   * Converte um objeto Date em uma string no formato brasileiro (dd/mm/yyyy).
   * @param {Date} data - O objeto Date a ser convertido.
   * @return {string} Uma string representando a data no formato dd/mm/yyyy.
   */
  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
  /**
   * Converte uma string no formato aaaa-mm-dd para um objeto Date.
   * @param {string} texto - A string representando a data no formato aaaa-mm-dd.
   * @return {Date} Um objeto Date correspondente à data fornecida.
   * @throws {Error} Lança um erro se o formato da string não for aaaa-mm-dd.
   */  
  static paraData(texto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
      throw new Error("Deve	estar	no	formato	aaaa-mm-dd");
    return new Date(...texto.split("-").map((item, indice) => item - (indice % 2)));
  }
}
