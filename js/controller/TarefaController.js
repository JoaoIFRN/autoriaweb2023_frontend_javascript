import tarefaView from "../view/TarefaView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarTarefaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = tarefaView.renderizarFormulario();
  document.getElementById("formulario_tarefa").addEventListener("submit", cadastrarTarefa);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTarefa(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById("tarefa_descricao_formulario").value;
  const novaTarefa = { titulo: tituloValor, descricao: descricaoValor };

  try {
    await fetch(`${API_BASE_URL}/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaTarefas(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/tarefas");
    const tarefasBD = await response.json(); 

    const tarefas = tarefasBD.map((row) => {
      return {
        id: row.id,
        titulo: row.titulo,
        descricao: row.descricao,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = tarefaView.renderizarTabela(tarefas);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const tarefaId = this.getAttribute("tarefa-id");
      excluirTarefa(tarefaId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const tarefaId = this.getAttribute("tarefa-atualizar-id");
      buscarTarefa(tarefaId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a tarefa");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`);
    const tarefasBD = await response.json();
    if (tarefasBD.length <= 0) return;

    const tarefa = tarefasBD.map(row => ({
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = tarefaView.renderizarFormularioAtualizar(tarefa);
    document.getElementById("formulario_tarefa_atualizar").addEventListener("submit", atualizarTarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarTarefa(event) {
  event.preventDefault();

  const idValor = document.getElementById("tarefa_id_formulario").value;
  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById("tarefa_descricao_formulario").value;
  const tarefa = {id: idValor, titulo: tituloValor,descricao: descricaoValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/tarefas`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a tarefa");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTarefas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
  }
}

const TarefaController = {
  renderizarTarefaFormulario,
  cadastrarTarefa,
  renderizarListaTarefas,
  excluirTarefa,
};

export default TarefaController;
