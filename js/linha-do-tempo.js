// Linha do Tempo: gera timeline alternada e carrossel de fichas/imagens
(function () {
  var obras = window.TIMELINE_OBRAS || [];
  var timeline = document.getElementById('timeline');
  if (!timeline || !obras.length) return;

  var EPOCAS = ['Antiguidade', 'Idade Média', 'Idade Moderna', 'Idade Contemporânea'];

  // Agrupa fichas por época
  var grupos = {};
  EPOCAS.forEach(function (ep) { grupos[ep] = []; });
  obras.forEach(function (o) {
    if (grupos[o.epoca]) grupos[o.epoca].push(o);
  });

  // Agrupa enciclopédias (lista completa) por época
  var enciclopedias = window.ENCICLOPEDIAS || [];
  var gruposEnc = {};
  EPOCAS.forEach(function (ep) { gruposEnc[ep] = []; });
  enciclopedias.forEach(function (e) {
    if (gruposEnc[e.epoca]) gruposEnc[e.epoca].push(e);
  });

  // Painel de outras enciclopédias
  var painelOutras = document.getElementById('outras-painel');
  var painelTitulo = document.getElementById('outras-painel-titulo');
  var painelLista = document.getElementById('outras-painel-lista');
  var painelClose = document.getElementById('outras-painel-close');

  function abrirOutras(ep) {
    var lista = gruposEnc[ep] || [];
    painelTitulo.textContent = ep + ' — Outras enciclopédias';
    painelLista.innerHTML = '';
    lista.forEach(function (enc) {
      var li = document.createElement('li');
      var tit = document.createElement('div');
      tit.className = 'outras-titulo';
      tit.textContent = enc.titulo;
      li.appendChild(tit);
      if (enc.autor) {
        var aut = document.createElement('div');
        aut.className = 'outras-autor';
        aut.textContent = enc.autor;
        li.appendChild(aut);
      }
      var ano = document.createElement('div');
      ano.className = 'outras-ano';
      var info = enc.ano;
      if (enc.pais) info += ' · ' + enc.pais;
      ano.textContent = info;
      li.appendChild(ano);
      painelLista.appendChild(li);
    });
    painelOutras.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharOutras() {
    painelOutras.classList.remove('active');
    document.body.style.overflow = '';
  }

  painelClose.addEventListener('click', fecharOutras);
  painelOutras.addEventListener('click', function (e) {
    if (e.target === painelOutras) fecharOutras();
  });

  // Gera secções alternadas
  EPOCAS.forEach(function (ep, i) {
    var items = grupos[ep];
    if (!items.length && !(gruposEnc[ep] && gruposEnc[ep].length)) return;

    var div = document.createElement('div');
    div.className = 'timeline-item ' + (i % 2 === 0 ? 'esquerda' : 'direita');

    var h2 = document.createElement('h2');
    h2.textContent = ep;
    div.appendChild(h2);

    var botoes = document.createElement('div');
    botoes.className = 'timeline-botoes';

    items.forEach(function (obra) {
      var btn = document.createElement('button');
      btn.className = 'timeline-botao';
      btn.type = 'button';
      btn.title = obra.nome;
      btn.setAttribute('aria-label', obra.nome);

      var img = document.createElement('img');
      img.src = obra.thumb;
      img.alt = obra.nome;
      img.loading = 'lazy';
      btn.appendChild(img);

      var label = document.createElement('span');
      label.className = 'timeline-botao-nome';
      label.textContent = obra.nome;
      btn.appendChild(label);

      btn.addEventListener('click', function () { abrirCarrossel(obra); });
      botoes.appendChild(btn);
    });

    // Botão "Outras enciclopédias"
    if (gruposEnc[ep] && gruposEnc[ep].length) {
      var btnOutras = document.createElement('button');
      btnOutras.className = 'timeline-botao-outras';
      btnOutras.type = 'button';
      btnOutras.title = 'Outras enciclopédias';
      btnOutras.setAttribute('aria-label', 'Outras enciclopédias — ' + ep);

      var circulo = document.createElement('div');
      circulo.className = 'outras-circulo';
      btnOutras.appendChild(circulo);

      var labelOutras = document.createElement('span');
      labelOutras.className = 'timeline-botao-nome';
      labelOutras.textContent = 'Outras enciclopédias';
      btnOutras.appendChild(labelOutras);

      (function (epoca) {
        btnOutras.addEventListener('click', function () { abrirOutras(epoca); });
      })(ep);
      botoes.appendChild(btnOutras);
    }

    div.appendChild(botoes);
    timeline.appendChild(div);
  });

  var abrirCarrossel = window._carrossel ? window._carrossel.abrir : function () {};

  document.addEventListener('keydown', function (e) {
    if (painelOutras.classList.contains('active') && e.key === 'Escape') {
      fecharOutras();
    }
  });
})();
