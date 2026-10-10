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

  // --- Ficha HTML builder ---
  function buildFichaHTML(d) {
    function secao(label, labelEn, content, contentEn, collapsible) {
      var wrapper = document.createElement('div');
      wrapper.className = 'ficha-cell';

      var lbl = document.createElement('div');
      lbl.className = 'ficha-cell-label';
      lbl.textContent = label + (labelEn ? ' / ' + labelEn : '');
      wrapper.appendChild(lbl);

      var textWrap = document.createElement('div');
      var val = document.createElement('div');
      val.className = 'ficha-text-content';
      val.textContent = content;
      textWrap.appendChild(val);

      if (contentEn) {
        var valEn = document.createElement('div');
        valEn.className = 'ficha-text-content-en';
        valEn.textContent = contentEn;
        textWrap.appendChild(valEn);
      }

      wrapper.appendChild(textWrap);

      if (collapsible) {
        textWrap.className = 'ficha-text-collapsed';
        var btn = document.createElement('button');
        btn.className = 'ficha-ler-mais';
        btn.textContent = 'Ler mais';
        btn.addEventListener('click', function () {
          var isCollapsed = textWrap.classList.toggle('ficha-text-collapsed');
          btn.textContent = isCollapsed ? 'Ler mais' : 'Ler menos';
        });
        wrapper.appendChild(btn);
        setTimeout(function () {
          if (textWrap.scrollHeight <= textWrap.clientHeight + 10) {
            textWrap.classList.remove('ficha-text-collapsed');
            btn.style.display = 'none';
          }
        }, 50);
      }

      return wrapper;
    }

    var container = document.createElement('div');
    container.className = 'ficha-corpo';

    // Header image
    var headerImg = document.createElement('img');
    headerImg.className = 'ficha-header-img';
    headerImg.src = d.headerImg;
    headerImg.alt = d.titulo;
    container.appendChild(headerImg);

    // Título + Autor
    var row1 = document.createElement('div');
    row1.className = 'ficha-row ficha-row-titulo';

    var cellTitulo = document.createElement('div');
    cellTitulo.className = 'ficha-cell';
    cellTitulo.innerHTML = '<div class="ficha-cell-label">Título / Title</div>' +
      '<div class="ficha-cell-value">' + d.titulo + '</div>' +
      '<div class="ficha-cell-value-en">(' + d.titulo_en + ')</div>';
    row1.appendChild(cellTitulo);

    var cellAutor = document.createElement('div');
    cellAutor.className = 'ficha-cell';
    cellAutor.innerHTML = '<div class="ficha-cell-label">Autor(es) / Author(s)</div>' +
      '<div class="ficha-cell-value">' + d.autor + '</div>' +
      '<div class="ficha-cell-value-en">(' + d.autor_en + ')</div>';
    row1.appendChild(cellAutor);

    container.appendChild(row1);

    // Ano + Local
    var row2 = document.createElement('div');
    row2.className = 'ficha-row ficha-row-ano';

    var cellAno = document.createElement('div');
    cellAno.className = 'ficha-cell';
    cellAno.innerHTML = '<div class="ficha-cell-label">Ano / Year</div>' +
      '<div class="ficha-cell-value">' + d.ano + '</div>' +
      '<div class="ficha-cell-value-en">(' + d.ano_en + ')</div>';
    row2.appendChild(cellAno);

    var cellLocal = document.createElement('div');
    cellLocal.className = 'ficha-cell';
    cellLocal.innerHTML = '<div class="ficha-cell-label">Local / Place</div>' +
      '<div class="ficha-cell-value">' + d.local + '</div>' +
      '<div class="ficha-cell-value-en">(' + d.local_en + ')</div>';
    row2.appendChild(cellLocal);

    container.appendChild(row2);

    // História & Curiosidades
    var row3 = document.createElement('div');
    row3.className = 'ficha-row-full';
    row3.appendChild(secao('História & Curiosidades', 'History & Curiosities', d.historia, d.historia_en, true));
    container.appendChild(row3);

    // Edições
    var row4 = document.createElement('div');
    row4.className = 'ficha-row-full';
    row4.appendChild(secao('Edições', 'Editions', d.edicoes, d.edicoes_en, true));
    container.appendChild(row4);

    return container;
  }

  // --- Carrossel ---
  var overlay = document.getElementById('carrossel');
  var imgEl = document.getElementById('carrossel-img');
  var fichaEl = document.getElementById('ficha-html');
  var btnPrev = document.getElementById('carrossel-prev');
  var btnNext = document.getElementById('carrossel-next');
  var btnClose = document.getElementById('carrossel-close');
  var contador = document.getElementById('carrossel-contador');

  var slides = [];
  var indice = 0;
  var currentFichaData = null;

  function abrirCarrossel(obra) {
    slides = [];
    currentFichaData = null;

    if (obra.fichaHTML && obra.fichaData) {
      slides.push({ type: 'html', data: obra.fichaData });
      currentFichaData = obra.fichaData;
    } else if (obra.ficha) {
      slides.push({ type: 'img', src: obra.ficha });
    }
    obra.galeria.forEach(function (g) {
      slides.push({ type: 'img', src: g });
    });

    indice = 0;
    mostrarSlide();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharCarrossel() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    fichaEl.innerHTML = '';
    fichaEl.classList.remove('active');
  }

  function mostrarSlide() {
    var slide = slides[indice];
    if (slide.type === 'html') {
      imgEl.style.display = 'none';
      fichaEl.innerHTML = '';
      fichaEl.appendChild(buildFichaHTML(slide.data));
      fichaEl.classList.add('active');
    } else {
      fichaEl.classList.remove('active');
      fichaEl.innerHTML = '';
      imgEl.style.display = '';
      imgEl.src = slide.src;
    }
    contador.textContent = (indice + 1) + ' / ' + slides.length;
    btnPrev.hidden = slides.length <= 1;
    btnNext.hidden = slides.length <= 1;
  }

  function navegar(dir) {
    indice = (indice + dir + slides.length) % slides.length;
    mostrarSlide();
  }

  btnClose.addEventListener('click', fecharCarrossel);
  btnPrev.addEventListener('click', function () { navegar(-1); });
  btnNext.addEventListener('click', function () { navegar(1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) fecharCarrossel();
  });

  document.addEventListener('keydown', function (e) {
    if (painelOutras.classList.contains('active')) {
      if (e.key === 'Escape') fecharOutras();
      return;
    }
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') fecharCarrossel();
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
  });
})();
