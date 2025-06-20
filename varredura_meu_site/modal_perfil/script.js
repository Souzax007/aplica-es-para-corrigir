// Pegando o botão do perfil e o menu dropdown do HTML
const botaoPerfil = document.getElementById('perfilBtn');
const menuPerfil = document.getElementById('perfilDropdown');

// Controla se o menu está aberto ou fechado
let menuAberto = false;

// Simula se o usuário está logado ou não
const usuarioLogado = false;

// Dados falsos do usuário (caso esteja logado)
const dadosUsuario = {
  nome: 'João Silva',
  email: 'joao@email.com',
  avatar: 'https://i.pravatar.cc/150?img=3'
};

// Função que mostra o conteúdo do menu dropdown
function mostrarMenu() {
  if (usuarioLogado) {
    // Se estiver logado, mostra nome, email, avatar e botões
    menuPerfil.innerHTML = `
      <div class="user-info">
        <img class="avatar" src="${dadosUsuario.avatar}" alt="Avatar">
        <div class="user-details">
          <h4>${dadosUsuario.nome}</h4>
          <small>${dadosUsuario.email}</small>
        </div>
      </div>
      <a href="#">Alterar Perfil</a>
      <button>Sair</button>
    `;
  } else {
    // Se for visitante (não logado), mostra formulário de login
    menuPerfil.innerHTML = `
      <div class="user-info">
        <img class="avatar" src="https://i.pravatar.cc/150?img=1" alt="Avatar">
        <div class="user-details">
          <h4>Visitante</h4>
          <small>Não autenticado</small>
        </div>
      </div>
      <form class="login-form">
        <input type="text" placeholder="Usuário" required>
        <input type="password" placeholder="Senha" required>
        <button type="submit">Login</button>
      </form>
      <a href="#">Registrar</a>
    `;
  }
}

// Quando o botão do perfil for clicado
botaoPerfil.addEventListener('click', function (event) {
  event.stopPropagation(); // Evita que o clique feche o menu sem querer

  // Mostra ou esconde o menu
  menuAberto = !menuAberto;
  menuPerfil.classList.toggle('hidden');

  // Se o menu estiver aberto, exibe as informações
  if (menuAberto) {
    mostrarMenu();
  }
});

// Fecha o menu se clicar fora dele
document.addEventListener('click', function (evento) {
  const clicouFora = !menuPerfil.contains(evento.target) && !botaoPerfil.contains(evento.target);

  if (menuAberto && clicouFora) {
    menuPerfil.classList.add('hidden');
    menuAberto = false;
  }
});
