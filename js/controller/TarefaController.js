import tarefaView from "../view/TarefaView.js";
import { API_BASE_URL } from "../config/config.js";

function renderizarTarefaFormulario(componentePrincipal) {
  const formularioTarefa = tarefaView.renderizarFormulario();
  componentePrincipal.innerHTML = formularioTarefa;
  const formulario = document.getElementById("formulario_tarefa");
  formulario.addEventListener("submit", cadastrarTarefa);
}

function cadastrarTarefa(event) {
  event.preventDefault();

  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById(
    "tarefa_descricao_formulario"
  ).value;

  const novaTarefa = {
    titulo: tituloValor,
    descricao: descricaoValor,
  };

  // Realiza a requisição POST
  fetch(API_BASE_URL + "/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaTarefa),
  })
    .then((data) => {
      const componentePrincipal = document.querySelector("#conteudo_principal");
      renderizarListaTarefas(componentePrincipal);
    })
    .catch((error) => {
      //console.error("Erro ao adicionar tarefa:", error);
    });
}

async function renderizarListaTarefas(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/tarefas");
    const tarefasBD = await response.json(); // supondo que a API retorna uma lista de usuários em formato JSON

    const tarefas = tarefasBD.map((row) => {
      return {
        id: row.id,
        titulo: row.titulo,
        descricao: row.descricao,
        dataAbertura: row.data_abertura,
      };
    });

    const tarefasLista = tarefaView.renderizarTabela(tarefas);
    componentePrincipal.innerHTML = tarefasLista;
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    //console.error("Erro ao buscar tarefas:", error);
  }
}

function inserirEventosExcluir(){
  const botoesExcluir = document.querySelectorAll('.excluir-btn');

  botoesExcluir.forEach((botao) => {
    botao.addEventListener('click', function() {
      const tarefaId = this.getAttribute('tarefa-id');
      excluirTarefa(tarefaId);
    });
  });
}

function inserirEventosAtualizar(){
  const botoesAtualizar = document.querySelectorAll('.atualizar-btn');

  botoesAtualizar.forEach((botao) => {
    botao.addEventListener('click', function() {
      const tarefaId = this.getAttribute('tarefa-atualizar-id');
      buscarTarefa(tarefaId);
    });
  });
}

function excluirTarefa(id) {
  fetch(`${API_BASE_URL}/tarefas/${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        const componentePrincipal = document.querySelector("#conteudo_principal");
        renderizarListaTarefas(componentePrincipal);
      } else {
        console.log("falha")
        console.error("Erro ao excluir a tarefa");
      }
    })
    .catch((error) => console.error("Erro de rede:", error));
}

async function buscarTarefa(id){
  try {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`);
    const tarefasBD = await response.json(); // supondo que a API retorna uma lista de usuários em formato JSON

    if (tarefasBD.lenght <= 0)
      return;

    const tarefas = tarefasBD.map((row) => {
      return {
        id: row.id,
        titulo: row.titulo,
        descricao: row.descricao,
        dataAbertura: row.data_abertura,
      };
    });

    const tarefa = tarefas[0];
    const componentePrincipal = document.querySelector("#conteudo_principal");
    const stringFormulario = tarefaView.renderizarFormularioAtualizar(tarefa);
    componentePrincipal.innerHTML = stringFormulario;
    const formulario = document.getElementById("formulario_tarefa_atualizar");
    formulario.addEventListener("submit", atualizarTarefa);

  } catch (error) {
    //console.error("Erro ao buscar tarefas:", error);
  }
}
function atualizarTarefa(event) {
  event.preventDefault();

  const idValor = document.getElementById("tarefa_id_formulario").value;
  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById(
    "tarefa_descricao_formulario"
  ).value;

  const tarefa = {
    id : idValor,
    titulo: tituloValor,
    descricao: descricaoValor,
  };

  // Realiza a requisição POST
  fetch(API_BASE_URL + "/tarefas", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((data) => {
      const componentePrincipal = document.querySelector("#conteudo_principal");
      renderizarListaTarefas(componentePrincipal);
    })
    .catch((error) => {
      //console.error("Erro ao adicionar tarefa:", error);
    });
}


const TarefaController = {
  renderizarTarefaFormulario,
  cadastrarTarefa,
  renderizarListaTarefas,
  excluirTarefa
}

export default TarefaController;
