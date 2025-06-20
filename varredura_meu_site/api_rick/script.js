const inputBusca = document.getElementById('busca');
const suggestionsBox = document.getElementById('suggestions');
const resultados = document.getElementById('resultados');

let todosPersonagens = [];

// Cria o card com os dados do personagem
function criarCard(personagem) {
  let episodios = '';

  personagem.episode.forEach((url, index) => {
    episodios += `<a href="${url}" target="_blank">Ep. ${index + 1}</a>`;
    if (index < personagem.episode.length - 1) {
      episodios += ', ';
    }
  });

  return `
    <div class="card">
      <img src="${personagem.image}" alt="${personagem.name}" />
      <h3>${personagem.name}</h3>
      <p>Espécie: ${personagem.species}</p>
      <p>Qtd de episódios: ${personagem.episode.length}</p>
      <p>Localização: ${personagem.location.name}</p>
      <p>Episódios: ${episodios}</p>
    </div>
  `;
}

// Mostra todos os cards dos personagens
function mostrarPersonagens(lista) {
  if (lista.length === 0) {
    resultados.innerHTML = '<p>Nenhum personagem encontrado.</p>';
    return;
  }

  let html = '';
  lista.forEach(function(personagem) {
    html += criarCard(personagem);
  });

  resultados.innerHTML = html;
}

// Busca todos os personagens, página por página
function carregarTodosPersonagens() {
  let url = 'https://rickandmortyapi.com/api/character';
  let personagens = [];

  function buscarPagina(paginaUrl) {
    fetch(paginaUrl)
      .then(function(resposta) {
        return resposta.json();
      })
      .then(function(dados) {
        personagens = personagens.concat(dados.results);

        if (dados.info.next) {
          buscarPagina(dados.info.next); // Busca a próxima página
        } else {
          todosPersonagens = personagens;
          mostrarPersonagens(todosPersonagens); // Quando termina tudo, mostra na tela
        }
      })
      .catch(function(erro) {
        console.error('Erro ao buscar personagens:', erro);
      });
  }

  buscarPagina(url);
}

// Mostra sugestões enquanto digita
function mostrarSugestoes(texto) {
  const busca = texto.toLowerCase();

  if (busca === '') {
    suggestionsBox.style.display = 'none';
    return;
  }

  const sugestoes = todosPersonagens
    .filter(function(p) {
      return p.name.toLowerCase().startsWith(busca);
    })
    .slice(0, 10);

  if (sugestoes.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  suggestionsBox.innerHTML = '';
  sugestoes.forEach(function(p) {
    const sugestao = document.createElement('div');
    sugestao.textContent = p.name;
    sugestao.dataset.name = p.name;
    suggestionsBox.appendChild(sugestao);
  });

  suggestionsBox.style.display = 'block';
}

// Quando digitar no campo de busca
inputBusca.addEventListener('input', function() {
  const valor = inputBusca.value.trim();
  mostrarSugestoes(valor);

  if (valor !== '') {
    const filtrados = todosPersonagens.filter(function(p) {
      return p.name.toLowerCase().includes(valor.toLowerCase());
    });
    mostrarPersonagens(filtrados);
  } else {
    mostrarPersonagens(todosPersonagens);
  }
});

// Quando clicar em uma sugestão
suggestionsBox.addEventListener('click', function(event) {
  if (event.target.dataset.name) {
    const nome = event.target.dataset.name;
    inputBusca.value = nome;
    suggestionsBox.style.display = 'none';

    const selecionados = todosPersonagens.filter(function(p) {
      return p.name === nome;
    });
    mostrarPersonagens(selecionados);
  }
});

// Esconde sugestões se clicar fora
document.addEventListener('click', function(event) {
  if (!inputBusca.contains(event.target) && !suggestionsBox.contains(event.target)) {
    suggestionsBox.style.display = 'none';
  }
});

// Começa tudo
carregarTodosPersonagens();
