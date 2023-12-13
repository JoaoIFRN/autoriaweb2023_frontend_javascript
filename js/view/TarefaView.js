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
    renderizarTabela
};

export default TarefaView;
