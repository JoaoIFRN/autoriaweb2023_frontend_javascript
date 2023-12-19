import { API_BASE_URL } from "../config/config.js";

/**
 * Realiza o login do usuário.
 * @param {Event} event - O evento do formulário de login.
 */
function realizarLogin(event) {
  event.preventDefault();

  // Obtém os valores de usuário e senha dos campos do formulário
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  // Chama a função para enviar os dados de login para o servidor
  enviarDadosLogin(usuario, senha);
}

/**
 * Envia uma solicitação de login para o servidor e lida com a resposta.
 * @param {string} usuario - Nome de usuário.
 * @param {string} senha - Senha do usuário.
 */
function enviarDadosLogin(usuario, senha) {
  fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Falha na solicitação de login');
    }
    return response.json();
  })
  .then(data => {
    // Lida com a resposta do servidor após o login
    processarRespostaLogin(data);
  })
  .catch(error => {
    console.error('Erro no login:', error);
    alert('Login falhou!');
  });
}

/**
 * Processa a resposta do servidor após a tentativa de login.
 * @param {Object} data - Resposta do servidor após a tentativa de login.
 */
function processarRespostaLogin(data) {
  if (data.token) {
    localStorage.setItem('token', data.token);
    document.getElementById('login').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } else {
    alert('Login falhou!');
  }
}

const LoginController = {
  realizarLogin
};

export default LoginController;
