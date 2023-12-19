import tarefaController from "../js/controller/TarefaController.js";

// Função auxiliar para selecionar elementos no DOM.
const $ = document.querySelector.bind(document);
const componentePrincipal = $("#conteudo_principal");

// Renderiza a lista de tarefas como visualização inicial.
tarefaController.renderizarListaTarefas(componentePrincipal);

/**
 * Fecha a barra de navegação lateral (navbar).
 */
function fecharNavBar() {
  const closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}

/**
 * Configura o evento de clique para o item de menu 'Tarefa'.
 * Fecha a navbar e renderiza o formulário de tarefa.
 */
$("#tarefa").addEventListener("click", () => {
  fecharNavBar();
  tarefaController.renderizarTarefaFormulario(componentePrincipal);
});

/**
 * Configura o evento de clique para o item de menu 'Lista de Tarefas'.
 * Fecha a navbar e renderiza a lista de tarefas.
 */
$("#lista_tarefas").addEventListener("click", () => {
  fecharNavBar();
  tarefaController.renderizarListaTarefas(componentePrincipal);
});