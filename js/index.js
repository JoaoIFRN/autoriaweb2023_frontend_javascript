import tarefaController from "../js/controller/TarefaController.js";

let $ = document.querySelector.bind(document);
const componentePrincipal = $("#conteudo_principal");

// Chamadas para renderização inicial
tarefaController.renderizarListaTarefas(componentePrincipal);

const fecharNavBar = () => {
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
};

//Teste fdsdsffd
$("#tarefa").addEventListener("click", () => {
  fecharNavBar();
  tarefaController.renderizarTarefaFormulario(componentePrincipal);
});

$("#lista_tarefas").addEventListener("click", () => {
  fecharNavBar();
  tarefaController.renderizarListaTarefas(componentePrincipal);
});
