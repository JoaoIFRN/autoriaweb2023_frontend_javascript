/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_tarefa">
              <div class="form-group">
                  <label for="tarefa_titulo">Título da tarefa:</label>
                  <input type="text" class="form-control" id="tarefa_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="tarefa_descricao">Descrição:</label>
                  <textarea class="form-control" id="tarefa_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} tarefa - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(tarefa) {
    return `
            <form class="mt-3" id="formulario_tarefa_atualizar">
                <input type="hidden" class="form-control" id="tarefa_id_formulario" value="${tarefa.id}">
                <div class="form-group">
                    <label for="tarefa_titulo">Título da tarefa:</label>
                    <input type="text" class="form-control" id="tarefa_titulo_formulario" value="${tarefa.titulo}">
                </div>
                <div class="form-group">
                    <label for="tarefa_descricao">Descrição:</label>
                    <textarea class="form-control" id="tarefa_descricao_formulario">${tarefa.descricao}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} tarefas - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(tarefas) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Título da tarefa</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  tarefas.forEach((tarefa) => {
    tabela += `
              <tr>
                  <td>${tarefa.titulo}</td>
                  <td>${tarefa.descricao}</td>
                  <td>
                    <button class="excluir-btn" tarefa-id=${tarefa.id}>Excluir</button>
                    <button class="atualizar-btn" tarefa-atualizar-id=${tarefa.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const TarefaView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default TarefaView;
