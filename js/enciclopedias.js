// Página Enciclopédias: gera uma tabela por época a partir de window.ENCICLOPEDIAS
// (definido em js/enciclopedias-dados.js, que é gerado automaticamente a partir dos dados).

(function () {
  const obras = window.ENCICLOPEDIAS || [];
  const destino = document.getElementById('tabelas-epocas');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  if (!destino) return;

  const COLUNAS = [
    ['primeira', '1ª Edição'],
    ['titulo', 'Título'],
    ['autor', 'Autor'],
    ['ultima', 'Última Edição'],
  ];

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  function edicaoTexto(ed) {
    return `${ed.num}ª ed. (${ed.ano})`;
  }

  function abrirEdicoes(obra) {
    const painel = el('div', 'painel-edicoes');
    painel.append(el('h3', '', obra.titulo));
    if (obra.autor) painel.append(el('p', 'painel-autor', obra.autor));
    const lista = el('ul');
    obra.edicoes.forEach((ed) => {
      lista.append(el('li', '', ed.pais ? `${edicaoTexto(ed)}, ${ed.pais}` : edicaoTexto(ed)));
    });
    painel.append(lista);
    modalContent.replaceChildren(painel);
    modal.classList.add('active');
  }

  function celulaTitulo(obra) {
    const celula = el('div', 'titulo');
    celula.dataset.campo = 'Título';
    const texto = el('span', 'titulo-texto', obra.titulo);
    const botao = el('button', 'ler-mais', 'Ler mais');
    botao.type = 'button';
    botao.hidden = true;
    botao.addEventListener('click', () => {
      const aberto = celula.classList.toggle('aberto');
      botao.textContent = aberto ? 'Ler menos' : 'Ler mais';
      botao.setAttribute('aria-expanded', String(aberto));
    });
    celula.append(texto, botao);
    return celula;
  }

  function celulaUltima(obra) {
    const celula = el('div');
    celula.dataset.campo = 'Última Edição';
    if (!obra.edicoes.length) return celula;
    const botao = el('button', 'btn-edicoes', edicaoTexto(obra.edicoes[obra.edicoes.length - 1]));
    botao.type = 'button';
    botao.setAttribute('aria-haspopup', 'dialog');
    botao.title = 'Ver todas as edições';
    botao.addEventListener('click', () => abrirEdicoes(obra));
    celula.append(botao);
    return celula;
  }

  function linhaObra(obra) {
    const linha = el('div', 'linha');
    const primeira = el('div', '', obra.pais ? `${obra.ano}, ${obra.pais}` : obra.ano);
    primeira.dataset.campo = '1ª Edição';
    const autor = el('div', '', obra.autor);
    autor.dataset.campo = 'Autor';
    linha.append(primeira, celulaTitulo(obra), autor, celulaUltima(obra));
    return linha;
  }

  // Agrupa por época, mantendo a ordem cronológica dos dados
  const epocas = [];
  obras.forEach((obra) => {
    let grupo = epocas[epocas.length - 1];
    if (!grupo || grupo.nome !== obra.epoca) {
      grupo = { nome: obra.epoca, obras: [] };
      epocas.push(grupo);
    }
    grupo.obras.push(obra);
  });

  epocas.forEach((grupo) => {
    const seccao = el('section', 'epoca');
    seccao.setAttribute('aria-label', grupo.nome);
    seccao.append(el('h3', 'epoca-nome', grupo.nome));
    const cabecalho = el('div', 'linha linha-cabecalho');
    COLUNAS.forEach(([, nome]) => cabecalho.append(el('div', '', nome)));
    seccao.append(cabecalho);
    grupo.obras.forEach((obra) => seccao.append(linhaObra(obra)));
    destino.append(seccao);
  });

  // «Ler mais» só aparece quando o título não cabe em 2 linhas
  function atualizarBotoes() {
    document.querySelectorAll('.titulo').forEach((celula) => {
      if (celula.classList.contains('aberto')) return;
      const texto = celula.querySelector('.titulo-texto');
      celula.querySelector('.ler-mais').hidden = texto.scrollHeight <= texto.clientHeight + 1;
    });
  }

  atualizarBotoes();
  window.addEventListener('resize', atualizarBotoes);
  if (document.fonts) document.fonts.ready.then(atualizarBotoes);
})();
