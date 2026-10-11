// Código partilhado: buildFichaHTML, carrossel e botão voltar ao topo
(function () {
  var overlay = document.getElementById('carrossel');
  if (!overlay) return;

  var imgEl = document.getElementById('carrossel-img');
  var fichaEl = document.getElementById('ficha-html');
  var btnPrev = document.getElementById('carrossel-prev');
  var btnNext = document.getElementById('carrossel-next');
  var btnClose = document.getElementById('carrossel-close');
  var contador = document.getElementById('carrossel-contador');
  var legendaEl = document.getElementById('carrossel-legenda');

  var slides = [];
  var indice = 0;

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

    var headerImg = document.createElement('img');
    headerImg.className = 'ficha-header-img';
    headerImg.src = d.headerImg;
    headerImg.alt = d.titulo;
    container.appendChild(headerImg);

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

    var row3 = document.createElement('div');
    row3.className = 'ficha-row-full';
    row3.appendChild(secao('História & Curiosidades', 'History & Curiosities', d.historia, d.historia_en, true));
    container.appendChild(row3);

    var row4 = document.createElement('div');
    row4.className = 'ficha-row-full';
    row4.appendChild(secao('Edições', 'Editions', d.edicoes, d.edicoes_en, true));
    container.appendChild(row4);

    return container;
  }

  function abrirCarrossel(obra) {
    slides = [];

    if (obra.fichaHTML && obra.fichaData) {
      slides.push({ type: 'html', data: obra.fichaData });
    } else if (obra.ficha) {
      slides.push({ type: 'img', src: obra.ficha, legenda: obra.fichaLegenda || '' });
    }
    obra.galeria.forEach(function (g) {
      if (typeof g === 'string') {
        slides.push({ type: 'img', src: g, legenda: '' });
      } else {
        slides.push({ type: 'img', src: g.src, legenda: g.legenda || '' });
      }
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
      legendaEl.textContent = '';
    } else {
      fichaEl.classList.remove('active');
      fichaEl.innerHTML = '';
      imgEl.style.display = '';
      imgEl.src = slide.src;
      legendaEl.textContent = slide.legenda || '';
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
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') fecharCarrossel();
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
  });

  window._carrossel = {
    abrir: abrirCarrossel,
    fechar: fecharCarrossel
  };

  // Botão voltar ao topo
  var btnTopo = document.getElementById('btn-topo');
  if (btnTopo) {
    window.addEventListener('scroll', function () {
      btnTopo.classList.toggle('visible', window.scrollY > 400);
    });
    btnTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
